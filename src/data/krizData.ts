/** Kriz hub — statik veri (gdaf.json). */

import gdaf from "./gdaf";

const wa = gdaf.water_access;

export const KRIZ_HERO = {
  eyebrow: "Hub 01 · Kriz & İhtiyaç",
  title: "Su, sağlık ve altyapı eş zamanlı çöküyor.",
  intro:
    "Gazze'de günlük kişi başı temiz su erişimi WHO acil eşiğinin yarısının altında. WASH altyapısının büyük bölümü işlevini yitirmiş durumda.",
};

export const KRIZ_WATER = {
  label: "SU KRİZİ",
  currentL: wa.median_daily_water_per_person.value,
  whoEmergencyL: wa.who_emergency_minimum.value,
  prewarL: wa.prewar_daily_water_per_person.value,
  scaleMaxL: wa.who_long_term_standard.value,
  headline: "Mevcut erişim, WHO acil eşiğinin yaklaşık",
  headlineHighlight: "%41'i.",
  source: "WASH R3",
  note: "Günlük içme suyu ~3 L; bazı bölgelerde 2 L'ye kadar düşüş.",
  markers: [
    { key: "current", label: "Mevcut erişim", value: "6,1", unit: "L/kişi/gün", tone: "risk" as const },
    { key: "who", label: "WHO acil eşiği", value: "15", unit: "L/kişi/gün", tone: "ink" as const },
    { key: "prewar", label: "Savaş öncesi", value: "82,7", unit: "L/kişi/gün", tone: "ink" as const },
  ],
};

export const KRIZ_POPULATION = [
  { label: "Toplam nüfus", value: "2.130.000" },
  { label: "Yerinden edilmiş", value: "1.900.000" },
  { label: "0–18 yaş çocuk", value: "1.090.000" },
  { label: "Risk altı gebe/emziren", value: "60.000" },
] as const;

export const KRIZ_HEALTH = gdaf.health_indicators.slice(0, 6).map((h) => ({
  label: h.indicator,
  value: h.value.toLocaleString("tr-TR"),
  unit: h.unit,
}));

export const KRIZ_INFRA = [
  { label: "Hasarlı WASH altyapısı", value: "%80", tone: "risk" as const },
  { label: "İşlevsiz su kuyusu", value: "%66", tone: "risk" as const },
  { label: "WASH yeniden inşa", value: "2,7 Mrd $", tone: "finance" as const },
  { label: "Toplam Gazze yeniden inşası", value: "~70 Mrd $", tone: "muted" as const },
] as const;

export const KRIZ_NEEDS = gdaf.priority_needs_distribution_pct.slice(0, 6).map((n) => ({
  name: n.need,
  value: n.all_gaza,
}));

export const KRIZ_NEEDS_NOTE = "Su üretim kapasitesi kaybı: günlük ~108.000 m³ düzeyinde.";

export const KRIZ_NEEDS_COLORS = [
  "#0F6E56",
  "#1D9E75",
  "#5DCAA5",
  "#EF9F27",
  "#A32D2D",
  "#888780",
];
