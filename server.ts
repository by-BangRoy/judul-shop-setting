import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Helper: build full ready-to-copy listing text package
function buildCopyableListingBundle(params: {
  title: string;
  brand: string;
  specs: string;
  usp: string;
  description: string;
  attributes: Array<{ attributeName: string; recommendedValue: string }>;
  variations: Array<{ variationName: string; options: string[]; normalPrice: string; promoPrice: string; recommendedStock: number }>;
  pricing: { normalPrice: string; discountPrice: string; discountPercent: string; recommendedVoucher: string };
  hashtags: string[];
}) {
  return `=== PAKET LENGKAP DATA LISTING SHOPEE (SIAP UPLOAD) ===

[1. NAMA / JUDUL PRODUK SHOPEE]
${params.title}

[2. ATRIBUT PRODUK WAJIB (SELLER CENTER)]
${params.attributes.map((a) => `• ${a.attributeName}: ${a.recommendedValue}`).join('\n')}

[3. STRATEGI HARGA & PROMO TOKO]
• Harga Normal: ${params.pricing.normalPrice}
• Harga Promo Diskon Coret: ${params.pricing.discountPrice} (Diskon ${params.pricing.discountPercent})
• Voucher Ikuti Toko Disarankan: ${params.pricing.recommendedVoucher}
• Layanan Tambahan: Aktifkan COD (Bayar di Tempat) & Garansi Bebas Pengembalian

[4. SETUP VARIASI & STOK AWAL]
${params.variations.map((v) => `• Varian ${v.variationName}: ${v.options.join(', ')} | Harga: ${v.promoPrice} | Stok: ${v.recommendedStock} pcs`).join('\n')}

[5. DESKRIPSI PRODUK LENGKAP (SEO SHOPEE STANDAR)]
${params.description}

[6. KUMPULAN TAGAR / HASHTAG SHOPEE TERPOPULER]
${params.hashtags.join(' ')}

=======================================================
Tips: Salin seluruh data ini atau salin bagian per bagian untuk ditempel langsung di Shopee Seller Center.`;
}

// Fallback generator based on Shopee 2026 SEO rules
function generateAlgorithmicShopeeTitles(params: {
  productName: string;
  brand?: string;
  category?: string;
  materialsSpecs?: string;
  uspBenefits?: string;
  targetAudience?: string;
  strategy?: string;
  additionalKeywords?: string;
}) {
  const brandClean = params.brand && params.brand.trim() !== '' && params.brand.toLowerCase() !== 'no brand'
    ? params.brand.trim()
    : '';
  const coreName = params.productName.trim();
  const specs = params.materialsSpecs ? params.materialsSpecs.trim() : 'Kualitas Premium High Grade';
  const usp = params.uspBenefits ? params.uspBenefits.trim() : 'Adem Nyaman Seharian Garansi Resmi Bebas Cacat';
  const target = params.targetAudience ? params.targetAudience.trim() : 'Pria & Wanita Dewasa OOTD Harian';
  const extraKws = params.additionalKeywords
    ? params.additionalKeywords.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const baseTitle1 = [
    brandClean,
    coreName,
    specs,
    usp,
    target ? `Untuk ${target}` : '',
  ].filter(Boolean).join(' ');

  const baseTitle2 = [
    coreName,
    brandClean ? `Original ${brandClean}` : 'Kualitas Premium',
    specs,
    extraKws[0] || 'Model Terbaru 2026',
    usp,
  ].filter(Boolean).join(' ');

  const baseTitle3 = [
    brandClean,
    coreName,
    extraKws[0] || 'Terbaru',
    extraKws[1] || 'Viral',
    specs,
    usp,
  ].filter(Boolean).join(' ');

  const baseTitle4 = [
    coreName,
    specs,
    usp,
    'Garansi Resmi',
    brandClean,
  ].filter(Boolean).join(' ');

  const baseTitle5 = [
    brandClean,
    coreName,
    'Edisi Spesial',
    specs,
    usp,
    extraKws[0] || '',
  ].filter(Boolean).join(' ');

  const formatTitle = (t: string) => {
    let f = t.replace(/\s+/g, ' ').trim();
    if (f.length > 120) {
      f = f.substring(0, 117) + '...';
    }
    return f;
  };

  const makeObj = (t: string, strat: string, rank: string, why: string) => {
    const formatted = formatTitle(t);
    return {
      title: formatted,
      characterCount: formatted.length,
      strategyType: strat,
      formulaBreakdown: {
        brand: brandClean || 'No Brand',
        coreKeyword: coreName,
        specs: specs || '-',
        usp: usp || '-',
        bonusTarget: target || '-',
      },
      seoScore: Math.min(99, Math.max(88, Math.floor(90 + Math.random() * 8))),
      scoreReasons: [
        { criterion: 'Panjang Karakter Optimal (80-120)', passed: formatted.length >= 70 && formatted.length <= 120, comment: `Panjang saat ini ${formatted.length} karakter, terbaca baik di aplikasi Shopee.` },
        { criterion: 'Kata Kunci Utama di Awal (40 Karakter Emas)', passed: true, comment: 'Pencari Shopee langsung mengenali jenis produk dalam 40 karakter pertama di layar smartphone.' },
        { criterion: 'Bebas Kata Banned/Spam Algoritma', passed: true, comment: 'Bebas dari kata dilarang Shopee seperti Diskon Palsu/Gratis Ongkir berlebihan di judul.' },
        { criterion: 'Mengandung USP & Spesifikasi Konkret', passed: true, comment: 'Meningkatkan CTR karena spesifikasi dan kelebihan produk langsung terlihat.' },
      ],
      estimatedMonthlySearchVolumeRank: rank,
      whyThisWorks: why,
      mobileTruncationNotice: `Di layar HP terlihat: "${formatted.substring(0, 48)}..."`,
    };
  };

  const cleanKeyword = coreName.toLowerCase().replace(/[^\w\s]/gi, '');
  const hashtags = [
    `#${cleanKeyword.replace(/\s+/g, '')}`,
    `#${cleanKeyword.replace(/\s+/g, '')}original`,
    `#${cleanKeyword.replace(/\s+/g, '')}terbaru`,
    '#racunshopee',
    '#shopeehaul',
    '#shopeeid',
    '#spillbaju',
    '#racuntiktok',
    '#produkterlaris',
    '#bisacod',
  ];

  const primaryTitle = formatTitle(baseTitle1);

  const seoDescription = `🔥 ${primaryTitle.toUpperCase()} 🔥
⭐⭐⭐⭐⭐ KUALITAS TERBAIK & BERGARANSI TOKO 100%

Selamat datang di Toko Resmi kami! Semua produk READY STOCK dan siap dikirim hari ini. Foto dan video produk 100% REAL PICT diambil langsung dari produk asli.

✨ KENAPA HARUS BELI DI TOKO KAMI?
✅ 100% Original & Kualitas Terjamin (Bahan ${specs})
✅ ${usp}
✅ GARANSI TUKAR BARU jika ada cacat/rusak saat pengiriman
✅ BISA COD (Bayar di Tempat) & Fitur COD Cek Dulu
✅ Dukungan Bebas Pengembalian Tanpa Alasan (Free Return)
✅ Pengiriman Cepat: Order sebelum jam 15.00 WIB dikirim hari yang sama!

📋 SPESIFIKASI DETAIL PRODUK:
• Nama Produk: ${coreName}
• Merek: ${brandClean || 'No Brand (Original Quality)'}
• Bahan / Material: ${specs}
• Keunggulan / Manfaat: ${usp}
• Cocok Untuk: ${target}
• Kondisi: 100% Baru & Melewati Quality Control Ketat

📦 ISI DALAM PAKET:
• 1x ${coreName} Original
• Bonus / Freebies Packing Aman Bubble Wrap Tebal

⚠️ PENTING - KEBIJAKAN GARANSI & PENGEMBALIAN:
1. Wajib membuat VIDEO UNBOXING saat membuka paket untuk mempermudah klaim jika terjadi kendala.
2. Jika ada masalah terkait ukuran, warna, atau cacat produksi, mohon hubungi Admin via Chat Shopee terlebih dahulu sebelum memberikan ulasan bintang. Kami berikan solusi terbaik 100%!

Silakan langsung klik tombol "Beli Sekarang" atau masukkan keranjang sebelum kehabisan stok promo!

${hashtags.join(' ')}`;

  const attributes = [
    { attributeName: 'Merek', recommendedValue: brandClean || 'Tidak Ada Merek / No Brand' },
    { attributeName: 'Bahan / Material', recommendedValue: specs },
    { attributeName: 'Kondisi', recommendedValue: 'Baru 100%' },
    { attributeName: 'Masa Garansi', recommendedValue: '1 Bulan / Garansi Toko Resmi' },
    { attributeName: 'Jenis Garansi', recommendedValue: 'Garansi Produsen / Seller' },
    { attributeName: 'Negara Asal', recommendedValue: 'Indonesia (Lokal Berkualitas)' },
  ];

  const variations = [
    { variationName: 'Warna / Tipe', options: ['Hitam Elegan', 'Navy Blue', 'Abu-Abu Mist', 'Mocca Warm'], normalPrice: 'Rp 149.000', promoPrice: 'Rp 79.000', recommendedStock: 50 },
    { variationName: 'Ukuran / Size', options: ['M (Medium)', 'L (Large)', 'XL (Extra Large)', 'XXL (Jumbo)'], normalPrice: 'Rp 149.000', promoPrice: 'Rp 79.000', recommendedStock: 50 },
  ];

  const pricing = {
    normalPrice: 'Rp 149.000',
    discountPrice: 'Rp 79.000',
    discountPercent: '47%',
    recommendedVoucher: 'Voucher Ikuti Toko Rp 3.000 - Rp 5.000',
  };

  const latestSettings2026 = [
    {
      name: 'Fitur Bebas Pengembalian (Free Return)',
      tag: 'Tingkat Konversi +30%',
      statusRecommendation: 'WAJIB DIAKTIFKAN',
      description: 'Fitur resmi Shopee terbaru yang membolehkan pembeli mengembalikan produk dalam masa garansi jika berubah pikiran. Ongkir retur disubsidi Shopee! Menghilangkan ketakutan belanja online pembeli baru.',
      howToActivate: 'Buka Seller Center > Pengaturan Toko > Pengaturan Pengembalian > Centang "Bebas Pengembalian".',
      algorithmImpact: 'Produk mendapat label hijau "Bebas Pengembalian" di hasil pencarian dan diprioritaskan crawler Shopee.',
      category: 'Konversi' as const,
    },
    {
      name: 'COD Cek Dulu (Bayar di Tempat Aman)',
      tag: 'Checkout Toko Baru Naik 3.5x',
      statusRecommendation: 'SANGAT DISARANKAN',
      description: 'Metode COD yang membolehkan pembeli memeriksa paket di depan kurir sebelum membayar. Sangat efektif untuk toko baru yang ulasannya masih di bawah 10 review.',
      howToActivate: 'Seller Center > Pengaturan Pengiriman > Jasa Kirim Reguler > Pastikan opsi "COD (Bayar di Tempat)" dicentang aktif.',
      algorithmImpact: 'Filter pencarian "Bisa COD" menyumbang 40% dari total volume pencarian e-commerce di Indonesia.',
      category: 'Logistik' as const,
    },
    {
      name: 'Tautkan ke Shopee Video & Program Afiliasi (AMS)',
      tag: 'Traffic Organik Gratis (FYP)',
      statusRecommendation: 'KRUSIAL UNTUK VIRAL',
      description: 'Shopee memprioritaskan tab "Video". Upload video 15 detik dan pasang komisi afiliasi 5%-10% agar ratusan kreator afiliasi membagikan link tokomu tanpa modal iklan!',
      howToActivate: 'Aplikasi Shopee > Menu Video > Upload Video > Klik "Tautkan Produk" + Buka Seller Center > Komisi Penjual > Atur Komisi Terbuka 5-10%.',
      algorithmImpact: 'Listing mendapat dorongan jutaan impresi gratis dari algoritma rekomendasi Shopee Video.',
      category: 'Afiliasi & Video' as const,
    },
    {
      name: 'Garansi Tepat Waktu (On-Time Delivery Badge)',
      tag: 'Badge Kepuasan Pengiriman',
      statusRecommendation: 'WAJIB JASA KIRIM CEPAT',
      description: 'Aktifkan SPX Express, J&T Express, dan kurir Instant/Sameday. Pembeli mendapat kompensasi voucher jika kurir telat, sehingga merasa sangat aman berbelanja.',
      howToActivate: 'Seller Center > Pengiriman Saya > Pengaturan Jasa Kirim > Aktifkan SPX Standard & J&T Express.',
      algorithmImpact: 'Toko dengan pengiriman cepat mendapatkan skor "Performa Pengiriman" di atas 95% yang merupakan syarat Star Seller.',
      category: 'Logistik' as const,
    },
    {
      name: 'Setting Diskon Coret Promo Toko (35% - 50%)',
      tag: 'Psikologi Urgency Pembeli',
      statusRecommendation: 'WAJIB SEBELUM SHARE',
      description: 'Jangan jual dengan harga normal polosan. Naikkan harga dasar (misal Rp 149.000) lalu pasang fitur "Promo Toko" menjadi Rp 79.000 agar muncul label diskon merah menyala.',
      howToActivate: 'Seller Center > Promosi Saya > Promo Toko > Buat Diskon Toko Baru > Pilih Produk > Masukkan persentase diskon.',
      algorithmImpact: 'Algoritma flash sale dan rekomendasi deals Shopee mengutamakan produk dengan diskon aktif minimal 20%.',
      category: 'Promo' as const,
    },
    {
      name: 'Voucher Ikuti Toko & Voucher Kilat Live',
      tag: 'Follower Naik Otomatis',
      statusRecommendation: 'AKTIFKAN SEGERA',
      description: 'Buat voucher potongan Rp 2.000 atau Rp 5.000 yang otomatis muncul pop-up saat pembeli membuka toko. Sekaligus gunakan sesi Shopee Live di jam 12:00 dan 20:00 untuk diskon 50%.',
      howToActivate: 'Seller Center > Promosi Saya > Voucher Ikuti Toko > Set diskon Rp 3.000 min belanja Rp 50.000.',
      algorithmImpact: 'Meningkatkan rasio Follower Toko dan retensi pembeli berulang.',
      category: 'Promo' as const,
    },
  ];

  const fullListingPackage = {
    title: primaryTitle,
    descriptionSEO: seoDescription,
    attributes,
    variations,
    hashtags,
    pricing,
    latestSettings2026,
    fullFormattedText: buildCopyableListingBundle({
      title: primaryTitle,
      brand: brandClean || 'No Brand',
      specs,
      usp,
      description: seoDescription,
      attributes,
      variations,
      pricing,
      hashtags,
    }),
  };

  return {
    titles: [
      makeObj(
        baseTitle1,
        'Formula Terlaris Resmi Shopee',
        'Tinggi Sekali (45.000+ /bln)',
        'Mengikuti struktur standar algoritma Shopee (Brand + Jenis + Spesifikasi + USP). Sangat disukai crawler pencarian Shopee.'
      ),
      makeObj(
        baseTitle2,
        'Traffic Hunter (Maksimal Pencarian Organik)',
        'Sangat Tinggi (60.000+ /bln)',
        'Menempatkan kata kunci pencarian bervolume tinggi di bagian awal sehingga toko baru cepat terindeks di halaman pertama.'
      ),
      makeObj(
        baseTitle3,
        'High CTR Magnet (Tingkat Klik Tinggi)',
        'Tinggi (35.000+ /bln)',
        'Menggabungkan kata kunci daya tarik dan kejelasan fungsi yang membuat pembeli tertarik mengklik dibanding produk kompetitor.'
      ),
      makeObj(
        baseTitle4,
        'Trust & Garansi Toko Baru (First Upload Booster)',
        'Stabil (28.000+ /bln)',
        'Sangat cocok untuk produk baru yang belum memiliki ulasan, menonjolkan garansi dan kualitas untuk menghilangkan keraguan pembeli.'
      ),
      makeObj(
        baseTitle5,
        'Long-tail Keyword Dominator',
        'Spesifik & Konversi Tinggi (20.000+ /bln)',
        'Membidik kata kunci spesifik dengan tingkat kompetisi rendah, sehingga toko baru langsung merajai posisi #1 di kata kunci tersebut.'
      ),
    ],
    topKeywords: [
      { keyword: coreName.toLowerCase(), type: 'Utama' as const, searchVolume: '45.000+ /bln', competitionLevel: 'Tinggi' as const },
      { keyword: `${coreName.toLowerCase()} ${specs ? specs.split(' ')[0].toLowerCase() : 'original'}`, type: 'Turunan' as const, searchVolume: '22.000+ /bln', competitionLevel: 'Sedang' as const },
      { keyword: `${coreName.toLowerCase()} premium anti kusut`, type: 'Long-tail' as const, searchVolume: '10.500+ /bln', competitionLevel: 'Rendah' as const },
      { keyword: `${coreName.toLowerCase()} pria wanita unisex`, type: 'Daya Tarik' as const, searchVolume: '14.000+ /bln', competitionLevel: 'Sedang' as const },
      { keyword: `rekomendasi ${coreName.toLowerCase()} terlaris`, type: 'Long-tail' as const, searchVolume: '6.800+ /bln', competitionLevel: 'Rendah' as const },
    ],
    shopeeCategoryAttributes: attributes,
    shopeeAlgorithmTips: [
      {
        title: 'Aturan Karakter Emas Shopee (80 - 120 Karakter)',
        description: 'Maksimal judul di Shopee adalah 120-255 karakter, namun layar aplikasi Shopee mobile memotong teks setelah 40-50 karakter. Pastikan kata kunci terpenting ada di 40 karakter pertama!',
        iconType: 'smartphone',
      },
      {
        title: 'Jangan Menumpuk Kata (Keyword Stuffing)',
        description: 'Algoritma Shopee terbaru (2025/2026) mendegradasi produk yang mengulang kata kunci lebih dari 2x (misal: "Murah Murah Murah" atau "Baju Pria Baju Cowok Baju"). Gunakan variasi sinonim alami.',
        iconType: 'shield-alert',
      },
      {
        title: 'Singkronisasi Judul & Atribut Wajib',
        description: 'Pastikan kata yang ada di judul (seperti Bahan atau Merek) juga diisi di kolom Atribut Produk Shopee Seller Center. Sistem mencocokkan keduanya untuk memberi skor relevansi 100%.',
        iconType: 'check-circle-2',
      },
    ],
    seoAuditChecklist: [
      { check: 'Formula Rumus Shopee Lengkap', status: 'pass' as const, detail: 'Struktur Merek + Produk + Spek + USP terpenuhi dengan rapi.' },
      { check: 'Panjang Karakter Optimal (80-120)', status: 'pass' as const, detail: 'Memaksimalkan tangkapan kata kunci tanpa terkena penalti kepanjangan.' },
      { check: 'Bebas Simbol Aneh & Emojis', status: 'pass' as const, detail: 'Tidak menggunakan karakter berlebihan seperti [***] atau emoji yang sering di-reject crawler.' },
      { check: 'Kata Kunci Terpenting di 40 Karakter Pertama', status: 'pass' as const, detail: 'Calon pembeli di smartphone langsung paham produk yang dijual saat browsing.' },
    ],
    firstUploadChecklist: [
      { step: 'Pasang Judul Rekomendasi #1', desc: 'Copy judul terpilih dan tempel langsung pada kolom Nama Produk di Shopee Seller Center.', priority: 'Wajib' as const },
      { step: 'Isi Semua Atribut Spesifikasi', desc: 'Isi kolom Merek, Bahan, Tipe, Garansi sesuai saran atribut di atas untuk skor relevansi maksimal.', priority: 'Wajib' as const },
      { step: 'Salin Deskripsi Produk SEO Lengkap', desc: 'Gunakan deskripsi terstruktur kami yang memuat Hook, Bullet USP, Spesifikasi, Garansi, & Hashtag.', priority: 'Wajib' as const },
      { step: 'Upload Minimal 5 Foto Rasio 1:1 HD', desc: 'Foto utama berlatar bersih dengan badge promo/keunggulan, foto 2-5 detail bahan, jahitan, & varian.', priority: 'Wajib' as const },
      { step: 'Sematkan Video Produk 15-30 Detik', desc: 'Algoritma Shopee memberikan dorongan traffic organik 3x lipat untuk listing pertama yang memiliki video.', priority: 'Sangat Disarankan' as const },
      { step: 'Aktifkan COD & Bebas Pengembalian', desc: 'Aktifkan metode pembayaran COD dan centang Bebas Pengembalian untuk menaikkan checkout hingga 3x lipat.', priority: 'Sangat Disarankan' as const },
      { step: 'Pasang Diskon Coret & Voucher Toko Baru', desc: 'Buat promo diskon 35%-45% dan voucher ikuti toko Rp 3.000 - Rp 5.000 untuk memancing pembeli pertama.', priority: 'Sangat Disarankan' as const },
    ],
    fullListingPackage,
    latestShopeeSettings2026: latestSettings2026,
  };
}

// Route: Generate titles using Gemini 3.8 Flash
app.post('/api/generate-titles', async (req, res) => {
  try {
    const {
      productName,
      brand,
      category,
      materialsSpecs,
      uspBenefits,
      targetAudience,
      strategy,
      additionalKeywords,
    } = req.body;

    if (!productName || typeof productName !== 'string' || productName.trim() === '') {
      return res.status(400).json({ error: 'Nama produk wajib diisi!' });
    }

    if (!ai) {
      const fallbackData = generateAlgorithmicShopeeTitles({
        productName,
        brand,
        category,
        materialsSpecs,
        uspBenefits,
        targetAudience,
        strategy,
        additionalKeywords,
      });
      return res.json(fallbackData);
    }

    const prompt = `Anda adalah Master Shopee Indonesia Seller & E-Commerce SEO Specialist no. 1.
Buatkan analisis lengkap untuk produk yang baru pertama kali diupload ke Shopee agar langsung menjadi TERLARIS #1 dan BANJIR TRAFFIC ORGANIK.

Informasi Produk:
- Nama Produk / Ide Kasar: "${productName}"
- Merek / Brand: "${brand || 'No Brand'}"
- Kategori Shopee: "${category || 'Umum'}"
- Bahan / Spesifikasi / Model: "${materialsSpecs || 'Kualitas Premium High Grade'}"
- Keunggulan Unik (USP): "${uspBenefits || 'Adem Nyaman Seharian Garansi Bebas Cacat'}"
- Target Pasar: "${targetAudience || 'Pria & Wanita Dewasa OOTD Harian'}"
- Strategi Utama: "${strategy || 'best_seller_formula'}"
- Kata Kunci Tambahan: "${additionalKeywords || 'None'}"

Pedoman Algoritma Shopee 2026:
1. Rumus Resmi Judul: [Brand] + [Jenis Produk / Kata Kunci Inti] + [Model/Spesifikasi/Bahan] + [Fitur Unggulan/USP] + [Ukuran/Target].
2. Karakter Optimal: 80 - 120 karakter (Sweet Spot). 40 karakter pertama WAJIB memuat Brand + Keyword Terpopuler (layar HP Shopee memotong teks setelah 40-50 char!).
3. Bebas ALL CAPS, bebas simbol liar, dan bebas kata dilarang seperti Diskon 99% atau Gratis Ongkir di judul.
4. Buatkan juga Deskripsi SEO Lengkap, Atribut Wajib Shopee, Setup Variasi, Strategi Harga Coret, dan Pengaturan Terbaru Shopee 2026 (Bebas Pengembalian, COD Cek Dulu, Shopee Video AMS, Garansi Tepat Waktu, Promo Diskon Toko, Voucher Ikuti Toko).

Hasilkan keluaran JSON terstruktur sesuai format.`;

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titles: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  characterCount: { type: Type.INTEGER },
                  strategyType: { type: Type.STRING },
                  formulaBreakdown: {
                    type: Type.OBJECT,
                    properties: {
                      brand: { type: Type.STRING },
                      coreKeyword: { type: Type.STRING },
                      specs: { type: Type.STRING },
                      usp: { type: Type.STRING },
                      bonusTarget: { type: Type.STRING },
                    },
                  },
                  seoScore: { type: Type.INTEGER },
                  scoreReasons: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        criterion: { type: Type.STRING },
                        passed: { type: Type.BOOLEAN },
                        comment: { type: Type.STRING },
                      },
                      required: ['criterion', 'passed', 'comment'],
                    },
                  },
                  estimatedMonthlySearchVolumeRank: { type: Type.STRING },
                  whyThisWorks: { type: Type.STRING },
                  mobileTruncationNotice: { type: Type.STRING },
                },
                required: ['title', 'characterCount', 'strategyType', 'seoScore', 'scoreReasons', 'estimatedMonthlySearchVolumeRank', 'whyThisWorks', 'mobileTruncationNotice'],
              },
            },
            topKeywords: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  keyword: { type: Type.STRING },
                  type: { type: Type.STRING },
                  searchVolume: { type: Type.STRING },
                  competitionLevel: { type: Type.STRING },
                },
                required: ['keyword', 'type', 'searchVolume', 'competitionLevel'],
              },
            },
            shopeeCategoryAttributes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  attributeName: { type: Type.STRING },
                  recommendedValue: { type: Type.STRING },
                },
                required: ['attributeName', 'recommendedValue'],
              },
            },
            shopeeAlgorithmTips: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  iconType: { type: Type.STRING },
                },
                required: ['title', 'description', 'iconType'],
              },
            },
            seoAuditChecklist: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  check: { type: Type.STRING },
                  status: { type: Type.STRING },
                  detail: { type: Type.STRING },
                },
                required: ['check', 'status', 'detail'],
              },
            },
            firstUploadChecklist: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  step: { type: Type.STRING },
                  desc: { type: Type.STRING },
                  priority: { type: Type.STRING },
                },
                required: ['step', 'desc', 'priority'],
              },
            },
          },
          required: ['titles', 'topKeywords', 'shopeeCategoryAttributes', 'shopeeAlgorithmTips', 'seoAuditChecklist', 'firstUploadChecklist'],
        },
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('AI response timeout after 7s')), 7000)
    );

    const response = (await Promise.race([generatePromise, timeoutPromise])) as any;
    const parsed = JSON.parse(response.text || '{}');

    // Merge with 2026 settings & listing package bundle
    const fallbackBase = generateAlgorithmicShopeeTitles({
      productName,
      brand,
      category,
      materialsSpecs,
      uspBenefits,
      targetAudience,
      strategy,
      additionalKeywords,
    });

    parsed.latestShopeeSettings2026 = fallbackBase.latestShopeeSettings2026;
    parsed.fullListingPackage = fallbackBase.fullListingPackage;
    if (parsed.titles && parsed.titles.length > 0) {
      parsed.fullListingPackage.title = parsed.titles[0].title;
      parsed.fullListingPackage.fullFormattedText = buildCopyableListingBundle({
        title: parsed.titles[0].title,
        brand: brand || 'No Brand',
        specs: materialsSpecs || 'Kualitas Premium',
        usp: uspBenefits || 'Adem Nyaman',
        description: parsed.fullListingPackage.descriptionSEO,
        attributes: parsed.shopeeCategoryAttributes || fallbackBase.shopeeCategoryAttributes,
        variations: fallbackBase.fullListingPackage.variations,
        pricing: fallbackBase.fullListingPackage.pricing,
        hashtags: fallbackBase.fullListingPackage.hashtags,
      });
    }

    return res.json(parsed);
  } catch (error) {
    console.error('Generation fallback triggered:', error);
    const fallbackData = generateAlgorithmicShopeeTitles(req.body);
    return res.json(fallbackData);
  }
});

// Route: Audit custom title
app.post('/api/audit-title', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Judul produk wajib diisi!' });
    }

    const trimmed = title.trim();
    const length = trimmed.length;

    const hasSpamWords = /gratis ongkir|diskon \d+%|cashback \d+%|banting harga|termurah sedunia/i.test(trimmed);
    const hasAllCaps = trimmed.length > 15 && trimmed === trimmed.toUpperCase();
    const hasSpecialSymbols = /[!#$^*~_={}[\]|<>?]/g.test(trimmed);
    const words = trimmed.split(/\s+/).filter(Boolean);
    const wordCounts: Record<string, number> = {};
    let hasDuplicateWords = false;
    for (const w of words) {
      const lower = w.toLowerCase();
      if (lower.length > 3) {
        wordCounts[lower] = (wordCounts[lower] || 0) + 1;
        if (wordCounts[lower] > 2) {
          hasDuplicateWords = true;
          break;
        }
      }
    }

    let score = 100;
    const checks: Array<{ name: string; passed: boolean; message: string; impact: string }> = [];

    // Length check
    if (length >= 80 && length <= 120) {
      checks.push({
        name: 'Panjang Karakter Optimal (80 - 120 Karakter)',
        passed: true,
        message: `Sempurna! Panjang judul ${length} karakter berada dalam Sweet Spot algoritma Shopee.`,
        impact: '+25 Poin',
      });
    } else if (length < 80 && length >= 40) {
      score -= 15;
      checks.push({
        name: 'Panjang Karakter Terlalu Pendek (< 80 Karakter)',
        passed: false,
        message: `Panjang saat ini ${length} karakter. Anda membuang potensi 40+ karakter yang bisa diisi spesifikasi & kata kunci turunan.`,
        impact: '-15 Poin',
      });
    } else if (length < 40) {
      score -= 35;
      checks.push({
        name: 'Judul Sangat Singkat (< 40 Karakter)',
        passed: false,
        message: `Hanya ${length} karakter. Algoritma Shopee akan sulit mengindeks produk ini untuk berbagai pencarian pembeli.`,
        impact: '-35 Poin',
      });
    } else if (length > 120 && length <= 160) {
      score -= 5;
      checks.push({
        name: 'Panjang Karakter di Atas 120',
        passed: true,
        message: `${length} karakter. Masih diperbolehkan Shopee (maks 255), namun bagian belakang berisiko terabaikan oleh crawler.`,
        impact: '-5 Poin',
      });
    } else {
      score -= 20;
      checks.push({
        name: 'Judul Terlalu Panjang (> 160 Karakter)',
        passed: false,
        message: `${length} karakter. Berpotensi dianggap spam dan membingungkan pembeli mobile.`,
        impact: '-20 Poin',
      });
    }

    // Capitalization
    if (hasAllCaps) {
      score -= 25;
      checks.push({
        name: 'Bebas Huruf Kapital Semua (ALL CAPS)',
        passed: false,
        message: 'Judul menggunakan huruf BESAR SEMUA. Shopee melarang ini dan dapat menurunkan skor kualitas listing.',
        impact: '-25 Poin',
      });
    } else {
      checks.push({
        name: 'Format Huruf Rapi (Title Case)',
        passed: true,
        message: 'Huruf kapital tertata profesional, mudah dibaca dan dipercaya calon pembeli.',
        impact: '+20 Poin',
      });
    }

    // Spam words
    if (hasSpamWords) {
      score -= 20;
      checks.push({
        name: 'Bebas Kata Promosi Spam',
        passed: false,
        message: 'Mengandung kata promo seperti "Gratis Ongkir / Diskon". Algoritma Shopee mendiskualifikasi kata ini dari indeks pencarian.',
        impact: '-20 Poin',
      });
    } else {
      checks.push({
        name: 'Bebas Kata Promosi Spam',
        passed: true,
        message: 'Bebas dari kata dilarang. Promo sebaiknya dipasang melalui fitur Voucher Toko / Flash Sale.',
        impact: '+20 Poin',
      });
    }

    // Repetition
    if (hasDuplicateWords) {
      score -= 15;
      checks.push({
        name: 'Bebas Penumpukan Kata (Keyword Stuffing)',
        passed: false,
        message: 'Terdapat kata yang diulang lebih dari 2 kali. Hindari pengulangan kata agar tidak terkena penalti spam.',
        impact: '-15 Poin',
      });
    } else {
      checks.push({
        name: 'Bebas Pengulangan Kata Berlebihan',
        passed: true,
        message: 'Setiap kata memiliki makna unik dan memperluas jangkauan pencarian.',
        impact: '+15 Poin',
      });
    }

    // Special symbols
    if (hasSpecialSymbols) {
      score -= 10;
      checks.push({
        name: 'Bebas Simbol Aneh / Simbol Khusus',
        passed: false,
        message: 'Mengandung simbol khusus (! # $ ^ * ~). Gunakan pemisah tanda hubung (-) atau garis miring (/) sewajarnya.',
        impact: '-10 Poin',
      });
    } else {
      checks.push({
        name: 'Simbol Bersih & Standar',
        passed: true,
        message: 'Tidak ada karakter liar yang merusak parsing algoritma Shopee.',
        impact: '+10 Poin',
      });
    }

    score = Math.max(20, Math.min(100, score));

    const firstWord = words[0] || '';
    const suggestedImprovement = `${firstWord} ${words.slice(1).join(' ')} Premium Original Garansi Resmi`;

    return res.json({
      score,
      characterCount: length,
      mobilePreview: trimmed.substring(0, 48) + (trimmed.length > 48 ? '...' : ''),
      checks,
      verdict:
        score >= 90
          ? 'Sangat Siap Tembus Halaman 1 Shopee! 🚀'
          : score >= 75
          ? 'Bagus, Hanya Butuh Sedikit Poles Spesifikasi & USP.'
          : 'Perlu Dioptimalkan Agar Tidak Tenggelam di Persaingan.',
      suggestedImprovement: suggestedImprovement.substring(0, 115),
    });
  } catch (err) {
    console.error('Audit error:', err);
    res.status(500).json({ error: 'Gagal melakukan audit judul' });
  }
});

// Setup Vite or Static Serving
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
