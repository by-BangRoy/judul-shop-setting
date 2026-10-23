import React, { useState } from 'react';
import {
  Copy,
  Check,
  Smartphone,
  Eye,
  TrendingUp,
  Award,
  Zap,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Tag,
  ListFilter,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Plus,
  PackageCheck,
  Sliders,
  Download,
  Sparkles,
} from 'lucide-react';
import { GenerationResponse, GeneratedTitleItem } from '../types';
import { ShopeeMobileSimulator } from './ShopeeMobileSimulator';
import { SHOPEE_POWER_WORDS } from '../data/presets';
import { ShopeeFullPackageView } from './ShopeeFullPackageView';
import { ShopeeSettings2026Tab } from './ShopeeSettings2026Tab';

interface Props {
  data: GenerationResponse;
}

export const TitleResultsList: React.FC<Props> = ({ data }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAllFast, setCopiedAllFast] = useState(false);
  const [selectedForPreview, setSelectedForPreview] = useState<number>(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [titlesState, setTitlesState] = useState<GeneratedTitleItem[]>(data.titles);
  const [activeTab, setActiveTab] = useState<'titles' | 'fullpackage' | 'settings2026' | 'keywords' | 'attributes' | 'checklist'>('titles');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  React.useEffect(() => {
    setTitlesState(data.titles);
    setSelectedForPreview(0);
    setExpandedIndex(0);
  }, [data]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    showToast('Judul berhasil disalin! Siap ditempel di Shopee Seller Center');
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyAllFast = () => {
    if (data.fullListingPackage?.fullFormattedText) {
      navigator.clipboard.writeText(data.fullListingPackage.fullFormattedText);
      setCopiedAllFast(true);
      showToast('Seluruh paket data listing berhasil disalin (Judul, Atribut, Deskripsi & Setting)!');
      setTimeout(() => setCopiedAllFast(false), 3000);
    }
  };

  const injectPowerWord = (titleIndex: number, word: string) => {
    const current = titlesState[titleIndex];
    if (current.title.toLowerCase().includes(word.toLowerCase())) {
      showToast(`Kata "${word}" sudah ada di dalam judul!`);
      return;
    }
    const updatedTitle = `${current.title} ${word}`.trim();
    const updatedLength = updatedTitle.length;

    const newTitles = [...titlesState];
    newTitles[titleIndex] = {
      ...current,
      title: updatedTitle,
      characterCount: updatedLength,
      mobileTruncationNotice: `Di layar HP terlihat: "${updatedTitle.substring(0, 48)}..."`,
    };
    setTitlesState(newTitles);
    showToast(`Kata "${word}" berhasil ditambahkan ke Judul #${titleIndex + 1}!`);
  };

  const activeTitle = titlesState[selectedForPreview] || titlesState[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-semibold border border-emerald-400/40 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Prominent All-in-One Listing Fast Action Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-orange-950/60 to-slate-900 border-2 border-orange-500/40 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#EE4D2D] text-white flex items-center justify-center shrink-0 shadow-lg shadow-orange-950/50">
            <PackageCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm sm:text-base font-black text-white">
                Paket Lengkap Data Listing Shopee Siap Upload
              </h4>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold px-2 py-0.5 rounded-full">
                100% Siap Salin
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Judul SEO, Deskripsi Lengkap, Atribut Wajib, Variasi & Harga Coret terangkum dalam 1 file.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => setActiveTab('fullpackage')}
            className="flex-1 md:flex-initial px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-700"
          >
            <span>Buka & Edit Paket</span>
          </button>

          <button
            onClick={handleCopyAllFast}
            className={`flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 shadow-lg ${
              copiedAllFast
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-[#EE4D2D] to-orange-500 text-white hover:from-orange-600 hover:to-orange-500 shadow-orange-950/40'
            }`}
          >
            {copiedAllFast ? (
              <>
                <Check className="w-4 h-4" />
                <span>SEMUA DATA TERSALIN!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>SALIN SEMUA DATA (1-KLIK)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sub-navigation tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('titles')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'titles'
              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>5 Judul Teroptimasi ({titlesState.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('fullpackage')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'fullpackage'
              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <PackageCheck className="w-4 h-4" />
          <span>Salin Semua Data Listing</span>
        </button>

        <button
          onClick={() => setActiveTab('settings2026')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'settings2026'
              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Settingan Shopee 2026</span>
        </button>

        <button
          onClick={() => setActiveTab('keywords')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'keywords'
              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Riset Kata Kunci</span>
        </button>

        <button
          onClick={() => setActiveTab('attributes')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'attributes'
              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Atribut Wajib</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'checklist'
              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ListFilter className="w-4 h-4" />
          <span>Audit Skor SEO</span>
        </button>
      </div>

      {/* Main Tab: 5 Titles */}
      {activeTab === 'titles' && (
        <div className="space-y-6">
          {/* Top: Live Mobile Preview of the Selected Title */}
          {activeTitle && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-orange-400" />
                  Pratinjau Nyata di Aplikasi Shopee: Judul #{selectedForPreview + 1}
                </span>
                <span className="text-xs text-orange-400 font-medium">
                  {activeTitle.characterCount} Karakter / Rekomendasi 80-120
                </span>
              </div>
              <ShopeeMobileSimulator title={activeTitle.title} />
            </div>
          )}

          {/* List of 5 Titles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                Pilihan Judul Rekomendasi Algoritma Shopee
              </h3>
              <span className="text-xs text-slate-400">
                Pilih judul terbaik untuk upload pertama Anda
              </span>
            </div>

            {titlesState.map((item, index) => {
              const isFirst = index === 0;
              const isSelected = selectedForPreview === index;
              const isExpanded = expandedIndex === index;

              let countColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
              let countStatus = 'Optimal Sweet Spot';
              if (item.characterCount < 60) {
                countColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
                countStatus = 'Agak Pendek';
              } else if (item.characterCount > 120) {
                countColor = 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
                countStatus = 'Di Atas 120 (Bisa Terpotong)';
              }

              return (
                <div
                  key={index}
                  className={`bg-slate-900 border rounded-2xl p-4 sm:p-5 transition shadow-lg ${
                    isSelected
                      ? 'border-orange-500 ring-1 ring-orange-500/40 shadow-orange-950/20'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Top Bar: Ranking, Strategy Badge & Score */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-black px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                          isFirst
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {isFirst ? '🏆 REKOMENDASI UTAMA #1' : `Opsi #${index + 1}`}
                      </span>

                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-orange-300 border border-slate-700">
                        {item.strategyType}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Skor SEO Shopee:</span>
                      <div className="flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs px-2.5 py-1 rounded-lg">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{item.seoScore}/100</span>
                      </div>
                    </div>
                  </div>

                  {/* The Title Text Box */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 mb-3 group relative">
                    <p className="text-sm sm:text-base font-semibold text-slate-100 leading-snug select-all">
                      {item.title}
                    </p>
                  </div>

                  {/* Character Counter & Specs Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-md border font-mono font-medium ${countColor}`}
                      >
                        {item.characterCount} Karakter ({countStatus})
                      </span>
                      <span className="text-slate-400 text-[11px] hidden sm:inline">
                        • Est. Volume: {item.estimatedMonthlySearchVolumeRank}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedForPreview(index)}
                        className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-orange-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isSelected ? 'Sedang Dipratinjau' : 'Pratinjau HP'}</span>
                      </button>

                      <button
                        onClick={() => copyToClipboard(item.title, index)}
                        className={`px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                          copiedIndex === index
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#EE4D2D] hover:bg-orange-600 text-white shadow'
                        }`}
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Judul</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Quick Power Words Injector */}
                  <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 mb-3">
                    <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-400" />
                      Sisipkan Kata Sakti Shopee (Klik untuk menambahkan di akhir judul):
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {SHOPEE_POWER_WORDS.slice(0, 6).map((pw, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => injectPowerWord(index, pw.text)}
                          className="bg-slate-800 hover:bg-orange-600 hover:text-white text-slate-300 text-[11px] px-2 py-0.5 rounded-md border border-slate-700 transition flex items-center gap-1"
                        >
                          <Plus className="w-2.5 h-2.5" />
                          <span>{pw.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Accordion Toggle */}
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-orange-400 py-1 transition border-t border-slate-800/80 pt-2"
                  >
                    <span className="flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      Kenapa Judul Ini Bikin Produk Cepat Laris?
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {/* Expanded Detail */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-800 space-y-3 text-xs animate-in fade-in duration-200">
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-slate-300 leading-relaxed">
                        <strong className="text-white block mb-1">
                          Analisis Kunci Algoritma:
                        </strong>
                        {item.whyThisWorks}
                      </div>

                      {item.formulaBreakdown && (
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
                          <div className="p-2 rounded bg-slate-950 border border-slate-800">
                            <span className="text-slate-400 block text-[9px] uppercase font-bold">
                              1. Brand
                            </span>
                            <span className="text-orange-300 font-semibold truncate block">
                              {item.formulaBreakdown.brand}
                            </span>
                          </div>
                          <div className="p-2 rounded bg-slate-950 border border-slate-800">
                            <span className="text-slate-400 block text-[9px] uppercase font-bold">
                              2. Jenis Produk
                            </span>
                            <span className="text-orange-300 font-semibold truncate block">
                              {item.formulaBreakdown.coreKeyword}
                            </span>
                          </div>
                          <div className="p-2 rounded bg-slate-950 border border-slate-800">
                            <span className="text-slate-400 block text-[9px] uppercase font-bold">
                              3. Spesifikasi
                            </span>
                            <span className="text-orange-300 font-semibold truncate block">
                              {item.formulaBreakdown.specs}
                            </span>
                          </div>
                          <div className="p-2 rounded bg-slate-950 border border-slate-800">
                            <span className="text-slate-400 block text-[9px] uppercase font-bold">
                              4. USP
                            </span>
                            <span className="text-orange-300 font-semibold truncate block">
                              {item.formulaBreakdown.usp}
                            </span>
                          </div>
                          <div className="p-2 rounded bg-slate-950 border border-slate-800 col-span-2 sm:col-span-1">
                            <span className="text-slate-400 block text-[9px] uppercase font-bold">
                              5. Target / Bonus
                            </span>
                            <span className="text-orange-300 font-semibold truncate block">
                              {item.formulaBreakdown.bonusTarget}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Checklist Breakdown */}
                      <div className="space-y-1.5 pt-1">
                        <span className="font-semibold text-slate-300 block">
                          Pemeriksaan Aturan Shopee:
                        </span>
                        {item.scoreReasons?.map((reason, rIdx) => (
                          <div
                            key={rIdx}
                            className="flex items-start gap-2 text-slate-400 text-[11px]"
                          >
                            {reason.passed ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <span className="text-slate-200 font-medium">
                                {reason.criterion}:
                              </span>{' '}
                              {reason.comment}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Full Listing Package View */}
      {activeTab === 'fullpackage' && data.fullListingPackage && (
        <ShopeeFullPackageView pkg={data.fullListingPackage} />
      )}

      {/* Shopee 2026 Settings Tab */}
      {activeTab === 'settings2026' && data.latestShopeeSettings2026 && (
        <ShopeeSettings2026Tab settings={data.latestShopeeSettings2026} />
      )}

      {/* Keywords Research Tab */}
      {activeTab === 'keywords' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              Kata Kunci Terpopuler di Shopee Indonesia
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Gunakan kata kunci ini dalam judul, deskripsi produk, atau kolom kata kunci iklan Shopee Anda.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2.5 px-3 font-semibold">Kata Kunci Pencarian</th>
                  <th className="py-2.5 px-3 font-semibold">Tipe Keyword</th>
                  <th className="py-2.5 px-3 font-semibold">Estimasi Pencarian</th>
                  <th className="py-2.5 px-3 font-semibold">Tingkat Persaingan</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {data.topKeywords?.map((kw, i) => (
                  <tr key={i} className="hover:bg-slate-850/60 transition">
                    <td className="py-2.5 px-3 font-semibold text-white">
                      {kw.keyword}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="bg-slate-800 text-orange-300 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-700">
                        {kw.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 font-mono">
                      {kw.searchVolume}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          kw.competitionLevel === 'Rendah'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : kw.competitionLevel === 'Sedang'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {kw.competitionLevel}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => copyToClipboard(kw.keyword, 100 + i)}
                        className="text-orange-400 hover:text-orange-300 text-xs font-semibold px-2 py-1 rounded hover:bg-slate-800 transition"
                      >
                        Salin
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Shopee Category Attributes Tab */}
      {activeTab === 'attributes' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Tag className="w-5 h-5 text-orange-400" />
              Rekomendasi Isi Kolom Atribut Shopee Seller Center
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Algoritma Shopee mencocokkan kata dalam Judul dengan kolom Atribut Produk. Mengisi atribut secara 100% lengkap melipatgandakan peluang tampil di hasil filter pembeli!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.shopeeCategoryAttributes?.map((attr, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                    Nama Kolom Atribut
                  </span>
                  <span className="text-sm font-bold text-white">{attr.attributeName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                    Saran Isi
                  </span>
                  <span className="text-xs font-semibold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20 inline-block">
                    {attr.recommendedValue}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Checklist Tab */}
      {activeTab === 'checklist' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Audit Kepatuhan Algoritma & Peluang Ranking #1
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Pastikan listing produk Anda memenuhi seluruh parameter relevansi sistem pencarian Shopee.
            </p>
          </div>

          <div className="space-y-3">
            {data.seoAuditChecklist?.map((chk, i) => (
              <div
                key={i}
                className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3"
              >
                <div className="mt-0.5">
                  {chk.status === 'pass' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{chk.check}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{chk.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Shopee Algorithm Tips */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Tips Algoritma Khusus Shopee Indonesia:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {data.shopeeAlgorithmTips?.map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-slate-850 p-3.5 rounded-xl border border-slate-800 space-y-1.5"
                >
                  <h5 className="text-xs font-bold text-orange-400">{tip.title}</h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
