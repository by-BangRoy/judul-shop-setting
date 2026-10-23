import React, { useState } from 'react';
import { Smartphone, Monitor, Star, MapPin, Truck, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Props {
  title: string;
  price?: string;
  originalPrice?: string;
  soldCount?: string;
  rating?: string;
  city?: string;
  badge?: 'Star+' | 'Mall' | 'Star' | 'Super Seller';
}

export const ShopeeMobileSimulator: React.FC<Props> = ({
  title,
  price = 'Rp89.000',
  originalPrice = 'Rp165.000',
  soldCount = '2,4rb Terjual',
  rating = '4.9',
  city = 'Kota Jakarta Pusat',
  badge = 'Star+',
}) => {
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');

  // Typically mobile Shopee truncates around character 45-50 depending on screen width
  const mobileCutoff = 48;
  const isCut = title.length > mobileCutoff;
  const mobileVisiblePart = title.substring(0, mobileCutoff);
  const mobileHiddenPart = title.substring(mobileCutoff);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl text-slate-100">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Simulator Hasil Pencarian Shopee Live
          </span>
        </div>
        <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md transition font-medium ${
              viewMode === 'mobile'
                ? 'bg-orange-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Layar HP (Mobile)
          </button>
          <button
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md transition font-medium ${
              viewMode === 'desktop'
                ? 'bg-orange-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Layar Desktop
          </button>
        </div>
      </div>

      {viewMode === 'mobile' ? (
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
          {/* Mobile phone mock frame */}
          <div className="w-68 max-w-full bg-white text-slate-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800">
            {/* Shopee App top bar simulation */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-2 text-white text-[11px] flex justify-between items-center font-medium">
              <span>Hasil Pencarian</span>
              <span className="text-[10px] bg-orange-700/60 px-1.5 py-0.5 rounded">Terkait</span>
            </div>

            {/* Product card inside search grid */}
            <div className="p-2.5 bg-slate-50">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
                {/* Product image container */}
                <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center text-center p-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-2">
                    <span className="text-xl font-bold">1:1</span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500">
                    Foto Utama Produk HD
                  </span>

                  {/* Badge Star+ */}
                  <div className="absolute top-2 left-0 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-r-md flex items-center gap-1 shadow">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    {badge}
                  </div>

                  {/* Discount tag top right */}
                  <div className="absolute top-0 right-0 bg-yellow-400 text-red-600 text-[10px] font-bold px-1.5 py-1 rounded-bl-lg shadow">
                    -46%
                  </div>

                  {/* COD Tag */}
                  <div className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur">
                    COD
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-2.5 flex flex-col justify-between min-h-[120px]">
                  <div>
                    {/* Simulated mobile title with truncation */}
                    <p className="text-[11px] leading-snug font-medium text-slate-800 line-clamp-2">
                      {title}
                    </p>

                    {/* Promotion Badges */}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      <span className="bg-orange-50 text-orange-600 border border-orange-200 text-[9px] px-1 py-0.2 rounded font-medium flex items-center gap-0.5">
                        <Truck className="w-2 h-2" /> Gratis Ongkir Xtra
                      </span>
                      <span className="bg-red-50 text-red-600 border border-red-200 text-[9px] px-1 py-0.2 rounded font-medium">
                        Cashback
                      </span>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-bold text-orange-600">{price}</span>
                      <span className="text-[9px] text-slate-400 line-through">
                        {originalPrice}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[9px] text-slate-500 mt-1">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-slate-700">{rating}</span>
                      </div>
                      <span>{soldCount}</span>
                    </div>

                    <div className="flex items-center gap-0.5 text-[9px] text-slate-400 mt-1 truncate">
                      <MapPin className="w-2.5 h-2.5 shrink-0" />
                      <span className="truncate">{city}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation panel */}
          <div className="flex-1 space-y-3 max-w-md">
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80 text-xs">
              <h4 className="font-bold text-orange-400 flex items-center gap-1.5 mb-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                Analisis Potongan Judul (Mobile Cutoff)
              </h4>
              <p className="text-slate-300 leading-relaxed mb-3">
                Pada aplikasi Shopee di ponsel, pembeli hanya membaca{' '}
                <strong className="text-white font-semibold">40-50 karakter pertama</strong> sebelum teks terpotong (...).
              </p>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700/60 font-mono text-[11px] space-y-1">
                <div className="text-emerald-400">
                  <span className="text-[10px] text-slate-400 block font-sans">
                    ✅ Pasti Terlihat Langsung (48 Karakter Awal):
                  </span>
                  &ldquo;{mobileVisiblePart}&rdquo;
                </div>
                {isCut && (
                  <div className="text-slate-400 line-through opacity-75">
                    <span className="text-[10px] text-slate-500 block font-sans">
                      ⚠️ Tersembunyi (Akan terlihat jika diklik):
                    </span>
                    &ldquo;{mobileHiddenPart}&rdquo;
                  </div>
                )}
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200">
              <strong className="font-semibold text-amber-300">💡 Rahasia Algoritma Terlaris:</strong>{' '}
              Pastikan nama jenis produk (misal: <em>Kemeja Pria</em>, <em>Serum Wajah</em>) dan spesifikasi inti berada di bagian depan agar pembeli yang sedang scrolling cepat langsung berhenti dan mengklik tokomu!
            </div>
          </div>
        </div>
      ) : (
        /* Desktop view */
        <div className="bg-white text-slate-900 p-4 rounded-xl border border-slate-200">
          <div className="flex gap-4 items-start">
            <div className="w-32 h-32 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 border border-slate-200 text-slate-400 text-xs font-semibold">
              Foto 1:1 HD
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {badge}
                </span>
                <span className="text-xs text-slate-500">{city}</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-800 leading-snug hover:text-orange-600 transition cursor-pointer">
                {title}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-orange-600">{price}</span>
                <span className="text-xs text-slate-400 line-through">{originalPrice}</span>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1 py-0.5 rounded">
                  -46%
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-700">{rating}</span>
                </div>
                <span>{soldCount}</span>
                <span className="text-emerald-600 font-medium">Bisa COD</span>
                <span className="text-orange-600 font-medium">Gratis Ongkir Xtra</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
