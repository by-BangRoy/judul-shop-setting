import React, { useState } from 'react';
import { ShoppingBag, Sparkles, HelpCircle, Flame, BookOpen, X, Check, ArrowRight } from 'lucide-react';

interface Props {
  activeTab: 'generator' | 'auditor' | 'guide' | 'settings';
  setActiveTab: (tab: 'generator' | 'auditor' | 'guide' | 'settings') => void;
}

export const Header: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const [showFormulaModal, setShowFormulaModal] = useState(false);

  return (
    <>
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#EE4D2D] via-[#F26522] to-[#FF8238] flex items-center justify-center text-white shadow-lg shadow-orange-950/50">
                <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                    Shopee Judul<span className="text-[#EE4D2D]">Booster</span>
                  </h1>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30">
                    <Flame className="w-3 h-3 fill-orange-400 text-orange-400" />
                    Target Terlaris #1
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-normal hidden sm:block">
                  Generator Judul Upload Pertama & Optimizer Algoritma SEO Shopee Indonesia
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab('generator')}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                  activeTab === 'generator'
                    ? 'bg-[#EE4D2D] text-white shadow-md shadow-orange-950/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-850'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Buat Judul</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                  activeTab === 'settings'
                    ? 'bg-[#EE4D2D] text-white shadow-md shadow-orange-950/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-850'
                }`}
              >
                <span className="hidden sm:inline">Settingan</span> 2026
              </button>

              <button
                onClick={() => setActiveTab('auditor')}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                  activeTab === 'auditor'
                    ? 'bg-[#EE4D2D] text-white shadow-md shadow-orange-950/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-850'
                }`}
              >
                <span>Cek Skor</span>
              </button>

              <button
                onClick={() => setActiveTab('guide')}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                  activeTab === 'guide'
                    ? 'bg-[#EE4D2D] text-white shadow-md shadow-orange-950/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-850'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden md:inline">Rahasia Upload #1</span>
                <span className="md:hidden">Panduan</span>
              </button>

              <button
                onClick={() => setShowFormulaModal(true)}
                title="Pelajari Rumus Resmi Shopee"
                className="p-2 rounded-xl text-slate-400 hover:text-orange-400 hover:bg-slate-850 transition"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Formula Modal */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative text-slate-100">
            <button
              onClick={() => setShowFormulaModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Rumus Baku Algoritma Judul Shopee Indonesia
              </h3>
            </div>

            <p className="text-sm text-slate-300 mb-4">
              Algoritma mesin pencari Shopee menggunakan sistem pembobotan relevansi (Relevance Matching Weight). Untuk mendapatkan skor tertinggi dan tampil di urutan atas, gunakan struktur resmi berikut:
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-orange-500/30 text-xs sm:text-sm font-mono space-y-2 mb-4">
              <div className="text-orange-400 font-bold">
                [Brand / Merek] + [Jenis Produk / Keyword Utama] + [Model/Spesifikasi/Bahan] + [Fitur Unggulan/USP] + [Ukuran/Target/Bonus]
              </div>
              <div className="text-slate-400 text-xs pt-2 border-t border-slate-800">
                <span className="text-emerald-400 font-bold">Contoh Sempurna:</span><br />
                <span className="text-white">Hexxa Kemeja Pria Lengan Panjang Katun Oxford Slimfit Anti Kusut Adem untuk Kerja Kantor Size M-XXL</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-5">
              <div className="bg-slate-850 p-3 rounded-lg border border-slate-800 space-y-1.5">
                <div className="font-bold text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> 4 Hal yang Disukai Shopee:
                </div>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  <li>Panjang antara <strong>80 - 120 karakter</strong></li>
                  <li>Kata kunci utama diletakkan di <strong>40 karakter pertama</strong></li>
                  <li>Huruf kapital di awal kata (Title Case)</li>
                  <li>Menyertakan bahan atau spesifikasi asli</li>
                </ul>
              </div>

              <div className="bg-slate-850 p-3 rounded-lg border border-slate-800 space-y-1.5">
                <div className="font-bold text-rose-400 flex items-center gap-1">
                  <X className="w-3.5 h-3.5" /> 4 Hal yang Dilarang / Dihukum:
                </div>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  <li>Semua huruf kapital (ALL CAPS)</li>
                  <li>Menulis kata promosi (Gratis Ongkir, Diskon 90%)</li>
                  <li>Pengulangan kata berulang kali (Spamming)</li>
                  <li>Simbol aneh seperti ***, !!!, ~~~</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowFormulaModal(false)}
                className="bg-[#EE4D2D] hover:bg-orange-600 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-1.5"
              >
                Saya Mengerti, Mulai Buat <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
