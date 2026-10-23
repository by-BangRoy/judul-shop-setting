import React from 'react';
import {
  Flame,
  Award,
  Clock,
  Camera,
  Video,
  Percent,
  Star,
  Zap,
  CheckCircle,
  TrendingUp,
  ShieldCheck,
  Package,
} from 'lucide-react';

export const FirstUploadGuide: React.FC = () => {
  const steps = [
    {
      stepNumber: '01',
      title: 'Kunci Judul Emas (Formula 80-120 Karakter)',
      icon: <Award className="w-5 h-5 text-orange-400" />,
      tag: 'Algoritma Pencarian',
      desc: 'Letakkan Brand + Kata Kunci Pencarian Utama pada 40 karakter pertama. Gunakan Title Case dan masukkan bahan serta garansi di bagian belakang untuk menjaring long-tail keywords.',
      checklist: [
        'Panjang 80-120 karakter (Sweet Spot Shopee)',
        'Bebas dari kata dilarang seperti "Diskon 90%" atau "Gratis Ongkir"',
        'Gunakan generator Shopee Judul Booster di tab pertama',
      ],
    },
    {
      stepNumber: '02',
      title: 'Foto Utama 1:1 yang Menghentikan Jempol (Thumb-Stop Visual)',
      icon: <Camera className="w-5 h-5 text-emerald-400" />,
      tag: 'Mendongkrak CTR (Klik)',
      desc: 'Pembeli Shopee memutuskan untuk mengklik dalam 0,5 detik. Foto pertama harus tajam, pencahayaan terang, latar belakang bersih, dan memiliki badge USP (misal: "Bahan Tebal", "Garansi 100%").',
      checklist: [
        'Rasio 1:1 resolusi minimal 1000 x 1000 pixel HD',
        'Upload minimal 5-8 foto: tampak depan, detail bahan/jahitan, kemasan, & varian',
        'Tambahkan frame badge promo resmi di sudut foto utama',
      ],
    },
    {
      stepNumber: '03',
      title: 'Sematkan Video Produk 15-30 Detik',
      icon: <Video className="w-5 h-5 text-blue-400" />,
      tag: 'Dorongan Algoritma 3x',
      desc: 'Algoritma Shopee secara otomatis memprioritaskan produk baru yang memiliki video demonstrasi asli. Tampilkan unboxing singkat atau keunggulan fungsi produk secara nyata.',
      checklist: [
        'Durasi optimal 15 - 30 detik',
        'Tampilkan tekstur atau pengoperasian barang secara langsung',
        'Tanpa musik berhak cipta yang terkena mute otomatis',
      ],
    },
    {
      stepNumber: '04',
      title: 'Lengkapi 100% Atribut Shopee Seller Center',
      icon: <Package className="w-5 h-5 text-amber-400" />,
      tag: 'Filter Pencarian Pembeli',
      desc: 'Jangan pernah membiarkan kolom Merek, Bahan, Tipe, Asal Produk kosong. Pembeli sering menggunakan filter Shopee (misal filter Bahan "Katun" atau Garansi "1 Bulan"). Jika kolom kosong, produk Anda hilang dari filter!',
      checklist: [
        'Isi kolom Merek (atau pilih "Tidak Ada Merek")',
        'Isi spesifikasi teknis lengkap sesuai saran atribut kami',
        'Pastikan skor kelengkapan produk mencapai "Sangat Baik"',
      ],
    },
    {
      stepNumber: '05',
      title: 'Pasang Strategi Harga Coret (Promo Diskon Toko)',
      icon: <Percent className="w-5 h-5 text-rose-400" />,
      tag: 'Psikologi Pembeli',
      desc: 'Jangan pasang harga asli tanpa coret. Pasang harga normal lebih tinggi (misal Rp 149.000), lalu masuk ke menu "Promosi Saya > Promo Toko" dan berikan diskon 40-50% menjadi Rp 79.000.',
      checklist: [
        'Badge diskon persen merah akan muncul di sudut produk',
        'Menstimulasi rasa mendesak (Urgency) calon pembeli',
        'Aktifkan opsi metode pembayaran COD (Bayar di Tempat)',
      ],
    },
    {
      stepNumber: '06',
      title: 'Amankan 5 Ulasan Bintang 5 Pertama (Seed Review)',
      icon: <Star className="w-5 h-5 text-yellow-400" />,
      tag: 'Faktor Konversi Kunci',
      desc: 'Produk dengan 0 ulasan memiliki tingkat konversi di bawah 1%. Dalam 48 jam pertama, mintalah pelanggan loyal, kenalan, atau tim Anda untuk membeli dan memberikan ulasan bintang 5 lengkap dengan foto & video asli.',
      checklist: [
        'Target minimal 3-5 ulasan foto & video di 3 hari pertama',
        'Ulasan foto asli menciptakan rasa percaya (Social Proof)',
        'Balas setiap ulasan dengan ramah dan profesional',
      ],
    },
    {
      stepNumber: '07',
      title: 'Manfaatkan 14 Hari Golden Window Shopee Boost',
      icon: <Clock className="w-5 h-5 text-purple-400" />,
      tag: 'Masa Emas Toko Baru',
      desc: 'Shopee memberikan subsidi dorongan traffic organik kepada listing produk yang baru dibuat selama 14 hari pertama. Jika produk Anda mencatatkan klik dan penjualan di masa ini, posisinya akan dikunci di halaman depan!',
      checklist: [
        'Gunakan fitur "Naikkan Produk" (Push 4 jam sekali) di Shopee',
        'Pasang Iklan Shopee Ads dengan kata kunci spesifik (CPC Rendah)',
        'Buat Voucher Ikuti Toko Rp 3.000 - Rp 5.000 untuk pancingan pertama',
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-orange-950/40 to-slate-900 border border-orange-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40 mb-3">
            <Flame className="w-3.5 h-3.5" />
            Rahasia Eksklusif Seller Shopee Terlaris No. 1
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-snug mb-3">
            Panduan Sakti 7 Langkah: Upload Pertama Langsung Banjir Orderan di Shopee
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Menulis judul yang tepat hanyalah langkah awal. Untuk benar-benar mengunci posisi #1 di Shopee dan mengubah pengunjung menjadi pembeli yang loyal, ikuti alur 7 langkah strategis berikut ini:
          </p>
        </div>
      </div>

      {/* 7 Steps Cards Grid */}
      <div className="space-y-4">
        {steps.map((st, i) => (
          <div
            key={i}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl transition hover:border-slate-700"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-black text-orange-400 text-sm">
                  {st.stepNumber}
                </span>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    {st.icon}
                  </div>
                  <h3 className="text-base font-bold text-white">{st.title}</h3>
                </div>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-orange-300 border border-slate-700 self-start sm:self-auto">
                {st.tag}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 pl-0 sm:pl-13">
              {st.desc}
            </p>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 sm:ml-13">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Daftar Centang Tindakan (Action Checklist):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {st.checklist.map((chk, cIdx) => (
                  <div
                    key={cIdx}
                    className="flex items-center gap-2 text-xs text-slate-200"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{chk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Golden Rule Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Ingat: Shopee Bukan Sekedar Siapa Yang Termurah!
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Produk terlaris nomor 1 adalah produk yang memiliki <strong>Judul Ramah Algoritma</strong>, <strong>Foto Utama Menarik</strong>, dan <strong>Respon Chat Cepat</strong>. Mulailah membuat judul produk pertama Anda sekarang!
          </p>
        </div>
      </div>
    </div>
  );
};
