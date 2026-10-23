import React, { useState } from 'react';
import { Sparkles, Layers, Tag, Shield, Target, Key, RefreshCw, Wand2, Check } from 'lucide-react';
import { SHOPEE_PRESETS } from '../data/presets';
import { ProductPreset } from '../types';

interface FormData {
  productName: string;
  brand: string;
  category: string;
  materialsSpecs: string;
  uspBenefits: string;
  targetAudience: string;
  strategy: string;
  additionalKeywords: string;
}

interface Props {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export const TitleGeneratorForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    brand: '',
    category: 'Fashion & Pakaian',
    materialsSpecs: '',
    uspBenefits: '',
    targetAudience: '',
    strategy: 'best_seller_formula',
    additionalKeywords: '',
  });

  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  const applyPreset = (preset: ProductPreset) => {
    setActivePresetId(preset.id);
    setFormData({
      productName: preset.productName,
      brand: preset.brand,
      category: preset.categoryName.replace(/^[^\w]+/, '').trim(),
      materialsSpecs: preset.materialsSpecs,
      uspBenefits: preset.uspBenefits,
      targetAudience: preset.targetAudience,
      strategy: 'best_seller_formula',
      additionalKeywords: preset.additionalKeywords,
    });
  };

  const handleNoBrand = () => {
    setFormData((prev) => ({ ...prev, brand: 'No Brand' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productName.trim()) return;
    onSubmit(formData);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden text-slate-100">
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />

      {/* Preset Chips */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            Contoh Cepat Produk Terlaris (Klik untuk Mengisi Otomatis):
          </label>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
          {SHOPEE_PRESETS.map((p) => {
            const isSelected = activePresetId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => applyPreset(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition border shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-orange-400" />}
                {p.categoryName}
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Row 1: Core Product Name & Brand */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              1. Nama Produk / Ide Kasar <span className="text-[#EE4D2D]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.productName}
                onChange={(e) => {
                  setFormData({ ...formData, productName: e.target.value });
                  setActivePresetId(null);
                }}
                placeholder="cth: Kemeja Pria Lengan Panjang Polos Slimfit"
                className="w-full bg-slate-950 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Sebutkan nama barang yang dicari orang (cth: casing hp, gamis crinkle, serum wajah).
            </p>
          </div>

          <div className="md:col-span-4">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-200">
                2. Merek / Brand
              </label>
              <button
                type="button"
                onClick={handleNoBrand}
                className="text-[11px] text-orange-400 hover:text-orange-300 transition underline underline-offset-2"
              >
                Tanpa Merek (No Brand)
              </button>
            </div>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              placeholder="cth: Hexxa, Erigo, atau No Brand"
              className="w-full bg-slate-950 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition"
            />
          </div>
        </div>

        {/* Row 2: Category & Materials/Specs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5">
            <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-orange-400" />
              3. Kategori Shopee
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500 transition"
            >
              <option value="Pakaian & Fashion Pria">Pakaian & Fashion Pria</option>
              <option value="Pakaian & Fashion Wanita">Pakaian & Fashion Wanita</option>
              <option value="Handphone & Aksesoris">Handphone & Aksesoris</option>
              <option value="Kecantikan & Skincare">Kecantikan & Skincare</option>
              <option value="Sepatu & Sandal">Sepatu & Sandal Pria / Wanita</option>
              <option value="Perlengkapan Rumah & Dapur">Perlengkapan Rumah & Dapur</option>
              <option value="Makanan & Minuman">Makanan & Minuman / Snack</option>
              <option value="Ibu & Bayi">Ibu & Bayi</option>
              <option value="Otomotif & Aksesoris Motor/Mobil">Otomotif & Aksesoris</option>
              <option value="Tas & Dompet">Tas & Dompet</option>
              <option value="Kesehatan & Kebugaran">Kesehatan & Kebugaran</option>
              <option value="Elektronik & Rumah Tangga">Elektronik & Gadget</option>
              <option value="Lainnya">Kategori Lainnya</option>
            </select>
          </div>

          <div className="md:col-span-7">
            <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-orange-400" />
              4. Bahan / Spesifikasi / Tipe / Ukuran
            </label>
            <input
              type="text"
              value={formData.materialsSpecs}
              onChange={(e) => setFormData({ ...formData, materialsSpecs: e.target.value })}
              placeholder="cth: Katun Oxford Tebal, Drop Protection, 30ml, 24cm"
              className="w-full bg-slate-950 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Spesifikasi konkret membuat pembeli yakin dan menaikkan konversi hingga 40%.
            </p>
          </div>
        </div>

        {/* Row 3: USP Benefits & Target Audience */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6">
            <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-orange-400" />
              5. Nilai Jual Unik (USP) / Keunggulan
            </label>
            <input
              type="text"
              value={formData.uspBenefits}
              onChange={(e) => setFormData({ ...formData, uspBenefits: e.target.value })}
              placeholder="cth: Adem Tidak Kusut, BPOM Halal, Garansi Bebas Cacat"
              className="w-full bg-slate-950 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition"
            />
          </div>

          <div className="md:col-span-6">
            <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-orange-400" />
              6. Target Pemakai / Varian / Musim
            </label>
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              placeholder="cth: Kerja Kantor, Remaja & Dewasa, Size M-XXL, Lebaran"
              className="w-full bg-slate-950 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition"
            />
          </div>
        </div>

        {/* Row 4: Strategy Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-2">
            7. Pilih Strategi Khusus Upload Pertama
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              {
                id: 'best_seller_formula',
                label: '🏆 Formula Terlaris No. 1',
                desc: 'Struktur standar resmi Shopee Mall & Star Seller. Paling seimbang untuk crawler & pembeli.',
              },
              {
                id: 'traffic_hunter',
                label: '🚀 Traffic Hunter (Maksimal Pencarian)',
                desc: 'Fokus menjaring ribuan pengunjung dari kata kunci pencarian terpopuler bervolume tinggi.',
              },
              {
                id: 'new_shop_first_upload',
                label: '🛡️ First Upload Trust Booster',
                desc: 'Fokus menghilangkan keraguan pembeli toko baru (garansi, keaslian, kualitas foto asli).',
              },
            ].map((strat) => (
              <label
                key={strat.id}
                className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                  formData.strategy === strat.id
                    ? 'bg-orange-500/15 border-orange-500 text-white'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="strategy"
                    value={strat.id}
                    checked={formData.strategy === strat.id}
                    onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
                    className="accent-orange-500"
                  />
                  <span className="text-xs font-bold text-white">{strat.label}</span>
                </div>
                <p className="text-[11px] text-slate-400 pl-5 leading-relaxed">{strat.desc}</p>
              </label>
            ))}
          </div>
        </div>

        {/* Row 5: Additional Keywords */}
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-orange-400" />
            Kata Kunci Tambahan / Sinonim (Opsional)
          </label>
          <input
            type="text"
            value={formData.additionalKeywords}
            onChange={(e) => setFormData({ ...formData, additionalKeywords: e.target.value })}
            placeholder="Pisahkan dengan koma, cth: baju cowok distro, kemeja kerja kantor, atasan casual"
            className="w-full bg-slate-950 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition"
          />
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            Algoritma SEO Shopee Indonesia Diperbarui 2026
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  productName: '',
                  brand: '',
                  category: 'Fashion & Pakaian',
                  materialsSpecs: '',
                  uspBenefits: '',
                  targetAudience: '',
                  strategy: 'best_seller_formula',
                  additionalKeywords: '',
                })
              }
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Reset Form
            </button>

            <button
              type="submit"
              disabled={isLoading || !formData.productName.trim()}
              className="flex-1 sm:flex-initial bg-gradient-to-r from-[#EE4D2D] to-[#F26522] hover:from-orange-600 hover:to-orange-500 disabled:opacity-50 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-orange-950/60 flex items-center justify-center gap-2 transition"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Menganalisis Algoritma Shopee...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Hasilkan Judul Terlaris No. 1</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
