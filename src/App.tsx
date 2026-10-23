import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TitleGeneratorForm } from './components/TitleGeneratorForm';
import { TitleResultsList } from './components/TitleResultsList';
import { TitleAuditorTab } from './components/TitleAuditorTab';
import { FirstUploadGuide } from './components/FirstUploadGuide';
import { ShopeeSettings2026Tab } from './components/ShopeeSettings2026Tab';
import { GenerationResponse } from './types';
import { SHOPEE_PRESETS } from './data/presets';
import {
  Sparkles,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'generator' | 'auditor' | 'guide' | 'settings'>('generator');
  const [generationData, setGenerationData] = useState<GenerationResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load an initial demo example so the user sees results immediately
  useEffect(() => {
    // Generate initial sample using the first preset
    const defaultPreset = SHOPEE_PRESETS[0];
    handleGenerate({
      productName: defaultPreset.productName,
      brand: defaultPreset.brand,
      category: 'Pakaian & Fashion Pria',
      materialsSpecs: defaultPreset.materialsSpecs,
      uspBenefits: defaultPreset.uspBenefits,
      targetAudience: defaultPreset.targetAudience,
      strategy: 'best_seller_formula',
      additionalKeywords: defaultPreset.additionalKeywords,
    });
  }, []);

  const handleGenerate = async (formData: {
    productName: string;
    brand: string;
    category: string;
    materialsSpecs: string;
    uspBenefits: string;
    targetAudience: string;
    strategy: string;
    additionalKeywords: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-titles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi server generator judul');
      }

      const data: GenerationResponse = await response.json();
      setGenerationData(data);
    } catch (err: any) {
      console.error('Error generating titles:', err);
      setError(
        'Terjadi kendala saat memproses judul. Sistem otomatis menggunakan generator cadangan berbasis algoritma Shopee.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-[#EE4D2D] selection:text-white">
      {/* Top Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Banner Alert if any */}
        {error && (
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs sm:text-sm text-amber-300 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-amber-400 hover:text-white font-bold ml-3"
            >
              Tutup
            </button>
          </div>
        )}

        {/* View Router */}
        {activeTab === 'generator' && (
          <div className="space-y-8">
            {/* Hero Pitch Banner */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30">
                <Flame className="w-3.5 h-3.5 fill-orange-400" />
                <span>Rahasia Seller Juara: Judul Emas + Relevansi Algoritma 100%</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Buat Judul Shopee yang <span className="text-[#EE4D2D]">Pasti Laris</span> Sejak Upload Pertama
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
                Didesain khusus untuk algoritma Shopee Indonesia: Menyesuaikan sweet spot 80-120 karakter, menempatkan kata kunci di 40 karakter pertama (tampilan HP), dan memadukan formula resmi <strong>[Brand] + [Jenis Produk] + [Spesifikasi] + [USP]</strong>.
              </p>
            </div>

            {/* Generator Form */}
            <TitleGeneratorForm onSubmit={handleGenerate} isLoading={isLoading} />

            {/* Loading Indicator or Results */}
            {isLoading && !generationData && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4 shadow-xl">
                <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin mx-auto"></div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">
                    Membedah Database Kata Kunci Shopee Indonesia...
                  </h3>
                  <p className="text-xs text-slate-400">
                    Menghitung skor SEO, optimasi batas karakter mobile, dan meracik formula terlaris.
                  </p>
                </div>
              </div>
            )}

            {generationData && (
              <div className="pt-2">
                <TitleResultsList data={generationData} />
              </div>
            )}
          </div>
        )}

        {activeTab === 'auditor' && <TitleAuditorTab />}

        {activeTab === 'settings' && generationData?.latestShopeeSettings2026 && (
          <ShopeeSettings2026Tab settings={generationData.latestShopeeSettings2026} />
        )}

        {activeTab === 'guide' && <FirstUploadGuide />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500 text-center space-y-2 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">Shopee Judul Booster</span>
            <span>•</span>
            <span>SEO & Traffic Optimizer untuk Seller Indonesia</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveTab('generator')}
              className="hover:text-orange-400 transition"
            >
              Generator Judul
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className="hover:text-orange-400 transition"
            >
              Settingan 2026
            </button>
            <button
              onClick={() => setActiveTab('auditor')}
              className="hover:text-orange-400 transition"
            >
              Cek Skor SEO
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className="hover:text-orange-400 transition"
            >
              Panduan Upload #1
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
