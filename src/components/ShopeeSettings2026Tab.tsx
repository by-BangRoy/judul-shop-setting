import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  Video,
  Percent,
  Ticket,
  CheckCircle,
  Copy,
  Check,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { ShopeeSettingItem2026 } from '../types';

interface Props {
  settings: ShopeeSettingItem2026[];
}

export const ShopeeSettings2026Tab: React.FC<Props> = ({ settings }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Konversi', 'Logistik', 'Afiliasi & Video', 'Promo'];

  const filteredSettings = selectedCategory === 'Semua'
    ? settings
    : settings.filter((s) => s.category === selectedCategory);

  const handleCopyGuide = (setting: ShopeeSettingItem2026, idx: number) => {
    const text = `[PENGATURAN SHOPEE: ${setting.name}]
Status: ${setting.statusRecommendation}
Kategori: ${setting.category}
Deskripsi: ${setting.description}
Cara Aktivasi di Seller Center: ${setting.howToActivate}
Dampak ke Algoritma: ${setting.algorithmImpact}`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-orange-950/40 to-slate-900 border border-orange-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40 mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            Update Sistem Shopee Seller Center 2026
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
            Panduan Settingan Wajib Shopee Terbaru untuk Upload Pertama
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Menulis judul saja tidak cukup! Algoritma Shopee terbaru (2026) memberikan bobot besar pada aktivasi fitur modern seperti <strong>Bebas Pengembalian</strong>, <strong>COD Cek Dulu</strong>, dan <strong>Shopee Video AMS</strong>. Aktifkan settingan di bawah ini agar tokomu langsung dipercaya calon pembeli dan mendapat prioritas ranking di halaman 1.
          </p>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
              selectedCategory === cat
                ? 'bg-[#EE4D2D] text-white border-orange-500 shadow-md shadow-orange-950/30'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSettings.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between transition hover:border-slate-700"
          >
            <div>
              {/* Badge & Title */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {item.statusRecommendation}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                {item.name}
              </h3>

              <div className="inline-block bg-slate-950 px-2.5 py-1 rounded-lg text-xs font-semibold text-orange-300 border border-slate-800 mb-3">
                ⚡ {item.tag}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* How to activate box */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 mb-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    📍 Cara Aktivasi di Shopee Seller Center:
                  </span>
                  <span className="text-slate-200 font-mono text-[11px] leading-snug block">
                    {item.howToActivate}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-0.5">
                    💡 Pengaruh ke Algoritma Shopee:
                  </span>
                  <span className="text-slate-300 text-[11px] leading-relaxed block">
                    {item.algorithmImpact}
                  </span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="flex justify-end pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => handleCopyGuide(item, idx)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  copiedIndex === idx
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-200'
                }`}
              >
                {copiedIndex === idx ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Panduan Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Petunjuk Settingan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Seller Warning Notice */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
        <Zap className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-white block font-semibold mb-0.5">
            Fakta Algoritma Shopee 2026:
          </strong>
          Toko baru yang langsung mengaktifkan <strong>Bebas Pengembalian</strong> dan <strong>COD Cek Dulu</strong> mencatatkan waktu <em>First Sale</em> rata-rata 3x lebih cepat (kurang dari 24 jam) dibanding toko yang hanya mengandalkan judul tanpa fitur proteksi pembeli.
        </div>
      </div>
    </div>
  );
};
