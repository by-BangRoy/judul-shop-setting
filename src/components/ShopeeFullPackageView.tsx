import React, { useState } from 'react';
import {
  Copy,
  Check,
  Download,
  FileText,
  Tag,
  Percent,
  Layers,
  Hash,
  Sparkles,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';
import { ShopeeFullListingPackage } from '../types';

interface Props {
  pkg: ShopeeFullListingPackage;
}

export const ShopeeFullPackageView: React.FC<Props> = ({ pkg }) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [editableDesc, setEditableDesc] = useState(pkg.descriptionSEO);

  React.useEffect(() => {
    setEditableDesc(pkg.descriptionSEO);
  }, [pkg.descriptionSEO]);

  const handleCopyAll = () => {
    navigator.clipboard.writeText(pkg.fullFormattedText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 3000);
  };

  const handleCopySection = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([pkg.fullFormattedText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Shopee-Listing-${pkg.title.substring(0, 25).replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-slate-100">
      {/* Top Banner with Quick 1-Click Copy */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-[#EE4D2D] rounded-3xl p-6 sm:p-7 shadow-2xl text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/20 backdrop-blur-md text-white mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Paket Siap Upload 100% Sesuai Standar Shopee Seller Center
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              Salin Semua Data Listing Shopee (1-Klik Siap Pakai)
            </h2>
            <p className="text-xs sm:text-sm text-orange-100 mt-1 max-w-2xl leading-relaxed">
              Semua data mulai dari Judul SEO, Deskripsi Berformat, Atribut Wajib, Rekomendasi Variasi, sampai Tagar telah dirangkum dalam satu paket rapi siap ditempel di akun tokomu.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleDownloadTxt}
              className="bg-slate-900/90 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition shadow flex items-center gap-2 border border-white/20"
            >
              <Download className="w-4 h-4" />
              <span>Unduh TXT</span>
            </button>

            <button
              onClick={handleCopyAll}
              className={`font-black text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-xl flex items-center gap-2 ${
                copiedAll
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-[#EE4D2D] hover:bg-orange-50'
              }`}
            >
              {copiedAll ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  <span>SEMUA DATA TERSALIN!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>SALIN SEMUA DATA (1-KLIK)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Sections: Title, Pricing, Variations, Attributes, Description */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Title, Pricing, Variations, Attributes */}
        <div className="lg:col-span-6 space-y-5">
          {/* Section 1: Title */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-orange-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  1. Nama / Judul Produk Shopee
                </h3>
              </div>
              <button
                onClick={() => handleCopySection(pkg.title, 'title')}
                className={`text-xs font-bold px-3 py-1 rounded-lg transition flex items-center gap-1 ${
                  copiedSection === 'title'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                }`}
              >
                {copiedSection === 'title' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'title' ? 'Tersalin' : 'Salin Judul'}</span>
              </button>
            </div>
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-sm font-semibold text-white select-all">
              {pkg.title}
            </div>
          </div>

          {/* Section 2: Pricing & Promotion Strategy */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-orange-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. Strategi Harga Coret & Promo Toko
                </h3>
              </div>
              <button
                onClick={() =>
                  handleCopySection(
                    `Harga Normal: ${pkg.pricing.normalPrice}\nHarga Diskon: ${pkg.pricing.discountPrice}\nDiskon: ${pkg.pricing.discountPercent}\nVoucher: ${pkg.pricing.recommendedVoucher}`,
                    'pricing'
                  )
                }
                className={`text-xs font-bold px-3 py-1 rounded-lg transition flex items-center gap-1 ${
                  copiedSection === 'pricing'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                }`}
              >
                {copiedSection === 'pricing' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'pricing' ? 'Tersalin' : 'Salin Setting'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Harga Normal (Input di Listing)</span>
                <span className="text-slate-300 line-through text-sm font-bold">{pkg.pricing.normalPrice}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Harga Jual Diskon (Promo Toko)</span>
                <span className="text-emerald-400 text-sm font-bold flex items-center gap-1.5">
                  {pkg.pricing.discountPrice}
                  <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-1 py-0.2 rounded">
                    -{pkg.pricing.discountPercent}
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Voucher Ikuti Toko Disarankan</span>
              <span className="text-orange-300 font-semibold">{pkg.pricing.recommendedVoucher}</span>
            </div>
          </div>

          {/* Section 3: Variations Setup */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-orange-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  3. Setup Variasi & Stok Awal
                </h3>
              </div>
              <button
                onClick={() =>
                  handleCopySection(
                    pkg.variations
                      .map((v) => `Varian ${v.variationName}: ${v.options.join(', ')} (Harga: ${v.promoPrice})`)
                      .join('\n'),
                    'variations'
                  )
                }
                className={`text-xs font-bold px-3 py-1 rounded-lg transition flex items-center gap-1 ${
                  copiedSection === 'variations'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                }`}
              >
                {copiedSection === 'variations' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'variations' ? 'Tersalin' : 'Salin Variasi'}</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {pkg.variations.map((v, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Varian: {v.variationName}</span>
                    <span className="text-[11px] text-orange-400 font-medium">Stok Awal Rekomendasi: {v.recommendedStock} pcs</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {v.options.map((opt, oIdx) => (
                      <span key={oIdx} className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-200 border border-slate-700">
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Mandatory Attributes */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-orange-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  4. Atribut Produk Wajib Seller Center
                </h3>
              </div>
              <button
                onClick={() =>
                  handleCopySection(
                    pkg.attributes.map((a) => `${a.attributeName}: ${a.recommendedValue}`).join('\n'),
                    'attributes'
                  )
                }
                className={`text-xs font-bold px-3 py-1 rounded-lg transition flex items-center gap-1 ${
                  copiedSection === 'attributes'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                }`}
              >
                {copiedSection === 'attributes' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'attributes' ? 'Tersalin' : 'Salin Atribut'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {pkg.attributes.map((attr, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400 font-medium">{attr.attributeName}</span>
                  <span className="text-white font-bold truncate max-w-[140px]">{attr.recommendedValue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: SEO Description & Hashtags */}
        <div className="lg:col-span-6 space-y-5">
          {/* Section 5: Formatted Shopee Description */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    5. Deskripsi SEO Standar Shopee (Lengkap)
                  </h3>
                </div>
                <button
                  onClick={() => handleCopySection(editableDesc, 'description')}
                  className={`text-xs font-bold px-3.5 py-1 rounded-lg transition flex items-center gap-1.5 ${
                    copiedSection === 'description'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#EE4D2D] hover:bg-orange-600 text-white shadow'
                  }`}
                >
                  {copiedSection === 'description' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'description' ? 'Tersalin!' : 'Salin Deskripsi'}</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 mb-2">
                Struktur rapi: Hook menarik, Garansi toko, Spesifikasi detail, Kebijakan unboxing, dan Hashtag. Anda bisa langsung mengedit teks di bawah sebelum disalin:
              </p>

              <textarea
                rows={22}
                value={editableDesc}
                onChange={(e) => setEditableDesc(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-orange-500 transition leading-relaxed resize-y"
              />
            </div>

            {/* Section 6: Hashtags */}
            <div className="mt-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Hash className="w-3.5 h-3.5 text-orange-400" />
                  Tagar / Hashtag Shopee Terpopuler
                </div>
                <button
                  onClick={() => handleCopySection(pkg.hashtags.join(' '), 'hashtags')}
                  className="text-xs text-orange-400 hover:text-orange-300 font-semibold"
                >
                  {copiedSection === 'hashtags' ? 'Tersalin!' : 'Salin Tagar'}
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {pkg.hashtags.map((tag, tIdx) => (
                  <span key={tIdx} className="bg-slate-950 text-orange-300 border border-slate-800 text-[11px] px-2 py-0.5 rounded font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
