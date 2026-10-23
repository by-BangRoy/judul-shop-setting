export interface FormulaBreakdown {
  brand: string;
  coreKeyword: string;
  specs: string;
  usp: string;
  bonusTarget: string;
}

export interface ScoreReason {
  criterion: string;
  passed: boolean;
  comment: string;
}

export interface GeneratedTitleItem {
  title: string;
  characterCount: number;
  strategyType: string;
  formulaBreakdown?: FormulaBreakdown;
  seoScore: number;
  scoreReasons: ScoreReason[];
  estimatedMonthlySearchVolumeRank: string;
  whyThisWorks: string;
  mobileTruncationNotice: string;
}

export interface TopKeyword {
  keyword: string;
  type: string;
  searchVolume: string;
  competitionLevel: string;
}

export interface ShopeeCategoryAttribute {
  attributeName: string;
  recommendedValue: string;
}

export interface ShopeeAlgorithmTip {
  title: string;
  description: string;
  iconType: string;
}

export interface SeoAuditChecklist {
  check: string;
  status: 'pass' | 'warning' | 'tip';
  detail: string;
}

export interface FirstUploadChecklist {
  step: string;
  desc: string;
  priority: string;
}

export interface VariationSetup {
  variationName: string;
  options: string[];
  normalPrice: string;
  promoPrice: string;
  recommendedStock: number;
}

export interface ShopeeSettingItem2026 {
  name: string;
  tag: string;
  statusRecommendation: string;
  description: string;
  howToActivate: string;
  algorithmImpact: string;
  category: 'Logistik' | 'Promo' | 'Fitur Shopee' | 'Afiliasi & Video' | 'Konversi';
}

export interface ShopeeFullListingPackage {
  title: string;
  descriptionSEO: string;
  attributes: ShopeeCategoryAttribute[];
  variations: VariationSetup[];
  hashtags: string[];
  pricing: {
    normalPrice: string;
    discountPrice: string;
    discountPercent: string;
    recommendedVoucher: string;
  };
  latestSettings2026: ShopeeSettingItem2026[];
  fullFormattedText: string;
}

export interface GenerationResponse {
  titles: GeneratedTitleItem[];
  topKeywords: TopKeyword[];
  shopeeCategoryAttributes: ShopeeCategoryAttribute[];
  shopeeAlgorithmTips: ShopeeAlgorithmTip[];
  seoAuditChecklist: SeoAuditChecklist[];
  firstUploadChecklist: FirstUploadChecklist[];
  fullListingPackage: ShopeeFullListingPackage;
  latestShopeeSettings2026: ShopeeSettingItem2026[];
}

export interface AuditCheck {
  name: string;
  passed: boolean;
  message: string;
  impact: string;
}

export interface AuditResponse {
  score: number;
  characterCount: number;
  mobilePreview: string;
  checks: AuditCheck[];
  verdict: string;
  suggestedImprovement: string;
}

export interface ProductPreset {
  id: string;
  categoryName: string;
  productName: string;
  brand: string;
  materialsSpecs: string;
  uspBenefits: string;
  targetAudience: string;
  additionalKeywords: string;
}
