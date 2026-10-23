import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  XCircle,
  Sparkles,
  Smartphone,
  Copy,
  Check,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { AuditResponse } from '../types';
import { ShopeeMobileSimulator } from './ShopeeMobileSimulator';

export const TitleAuditorTab: React.FC = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [auditResult, setAuditResult] = useState<AuditResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAudit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputTitle.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/audit-title', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: inputTitle }),
      });
      const data: AuditResponse = await res.json();
      setAuditResult(data);
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySuggestion = () => {
    if (!auditResult?.suggestedImprovement) return;
    navigator.clipboard.writeText(auditResult.suggestedImprovement);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleTitles = [
    'kemeja pria',
    'KEMEJA PRIA LENGAN PANJANG MURAH BANGET GRATIS ONGKIR TERMURAH SE DUNIA!!!!!',
    'Hexxa Kemeja Pria Lengan Panjang Katun Oxford Slimfit Anti Kusut Adem Kerja Kantor',
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Introduction Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden text-slate-100">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Audit Algoritma Shopee
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
            Pemeriksa & Evaluator Skor SEO Judul Shopee
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
            Punya judul sendiri atau ingin menguji judul kompetitor? Tempel judul Anda di bawah untuk menguji apakah judul tersebut mematuhi sweet spot 80-120 karakter, terbebas dari penalti spam, dan terbaca utuh di aplikasi Shopee mobile.
          </p>

          {/* Quick sample chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs mb-5">
            <span className="text-slate-500 font-semibold">Coba contoh:</span>
            {sampleTitles.map((t, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputTitle(t);
                }}
                className="bg-slate-800 hover:bg-slate-750 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 transition truncate max-w-[260px]"
              >
                {t}
              </button>
            ))}
          </div>

          <form onSubmit={handleAudit} className="space-y-3">
            <div className="relative">
              <textarea
                rows={3}
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                placeholder="Tempel atau ketik judul produk Shopee Anda di sini..."
                className="w-full bg-slate-950 border border-slate-700 focus:border-orange-500 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition resize-none"
              />
              <div className="absolute bottom-3 right-4 text-xs font-mono text-slate-400">
                {inputTitle.length} karakter (Rekomendasi: 80 - 120)
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={isLoading || !inputTitle.trim()}
                className="bg-gradient-to-r from-[#EE4D2D] to-orange-600 hover:from-orange-600 hover:to-orange-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-orange-950/50 flex items-center gap-2 transition"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Menganalisis...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Periksa Skor & Kepatuhan Algoritma</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Audit Results */}
      {auditResult && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
          {/* Top Score Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div
                className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-black text-2xl border-2 shrink-0 ${
                  auditResult.score >= 85
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                    : auditResult.score >= 70
                    ? 'bg-amber-500/15 border-amber-500 text-amber-400'
                    : 'bg-rose-500/15 border-rose-500 text-rose-400'
                }`}
              >
                <span>{auditResult.score}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  / 100
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Hasil Evaluasi SEO Shopee
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{auditResult.verdict}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Panjang: <strong className="text-white">{auditResult.characterCount} Karakter</strong> •{' '}
                  {auditResult.characterCount >= 80 && auditResult.characterCount <= 120
                    ? '✅ Berada dalam rentang optimal 80-120'
                    : '⚠️ Belum mencapai rentang optimal 80-120'}
                </p>
              </div>
            </div>

            {/* Quick action button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setInputTitle(auditResult.suggestedImprovement);
                  handleAudit();
                }}
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Terapkan Saran Perbaikan</span>
              </button>
            </div>
          </div>

          {/* Shopee Mobile Mockup for this title */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-orange-400" />
                Tampilan Judul Anda di Layar Smartphone Calon Pembeli
              </span>
            </div>
            <ShopeeMobileSimulator title={inputTitle} />
          </div>

          {/* Detailed Audit Checkpoints */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Rincian Pemeriksaan Algoritma (Shopee Compliance Checklist)
            </h4>

            <div className="space-y-2.5">
              {auditResult.checks.map((chk, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {chk.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{chk.name}</div>
                      <p className="text-xs text-slate-400 mt-0.5">{chk.message}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded shrink-0 ${
                      chk.passed
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {chk.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Suggested Better Version */}
          {auditResult.suggestedImprovement && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-orange-500/40 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400">
                  Rekomendasi Versi Yang Disempurnakan:
                </h4>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-sm font-semibold text-white mb-3">
                {auditResult.suggestedImprovement}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCopySuggestion}
                  className="bg-[#EE4D2D] hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Versi Yang Disempurnakan</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
