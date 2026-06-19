/** Ana sayfa — statik veri (GDAF raporu, kesin değerler). */

export const HOME_HERO = {
  title: "Gazze için dirençli etki ve altyapı modeli",
  subtitle:
    "Katılım finansı temelli WASH altyapısı modeli; kriz verisini, finansman mimarisini, senaryo analizini ve sosyal etkiyi tek platformda birleştirir.",
  badges: [
    { id: "wash", label: "WASH odaklı", icon: "droplet" as const },
    { id: "data", label: "Veriye dayalı", icon: "activity" as const },
    { id: "resilient", label: "Dirençli gelecek", icon: "shield-check" as const },
  ],
};

export const HOME_WATER = {
  label: "SU KRİZİ",
  currentL: 6.1,
  whoEmergencyL: 15,
  prewarL: 82.7,
  scaleMaxL: 100,
  headline: "Mevcut erişim, WHO acil eşiğinin yaklaşık",
  headlineHighlight: "%41'i.",
  source: "WASH güncellemesi",
  markers: [
    { key: "current", label: "Mevcut erişim", value: "6,1", unit: "L/kişi/gün", tone: "risk" as const },
    { key: "who", label: "WHO acil eşiği", value: "15", unit: "L/kişi/gün", tone: "ink" as const },
    { key: "prewar", label: "Savaş öncesi", value: "82,7", unit: "L/kişi/gün", tone: "ink" as const },
  ],
};

export const HOME_CRISIS_STRIP = [
  { icon: "users", value: "2.130.000", label: "etkilenen nüfus", tone: "risk" as const },
  { icon: "user-minus", value: "1.900.000", label: "yerinden edilmiş", tone: "risk" as const },
  { icon: "droplet", value: "%80", label: "WASH altyapı hasarı", tone: "risk" as const },
  { icon: "construction", value: "2,7 Mrd $", label: "yeniden inşa ihtiyacı", tone: "finance" as const },
] as const;

export const HOME_FUND = {
  total: "200",
  unit: "mn $",
  title: "Model bir bakışta · Fon kompozisyonu",
  centerLabel: "Faz 1 kaynak büyüklüğü",
  note: "Sukuk birincil kaynak değildir · %25 tavan",
  layers: [
    { id: "vakif", name: "Vakıf sermayesi", amount: "100 mn $", sharePct: 50, color: "#0F6E56", description: "Dokunulmaz anapara; yalnızca getirisi kullanılır. Faz 1'in ana güvence kaynağıdır." },
    { id: "sukuk", name: "Sosyal etkili sukuk", amount: "50 mn $", sharePct: 25, color: "#1D9E75", description: "İlk ihraç: üretim/tedarik tesisi ve cihaz havuzu. Birincil kaynak değildir; %25 tavan." },
    { id: "kitle", name: "Kitle fonlaması", amount: "20 mn $", sharePct: 10, color: "#5DCAA5", description: "Müşareke modeli; mikro varlık ortaklığı. Geliri sukuk havuzuna aktarılamaz." },
    { id: "hibe", name: "Hibe / teberru", amount: "20 mn $", sharePct: 10, color: "#EF9F27", description: "Karşılıksız kaynak; acil sosyal hizmet ve ilk kurulum desteği." },
    { id: "karz", name: "Karz-ı hasen", amount: "10 mn $", sharePct: 5, color: "#888780", description: "Faizsiz borç; yalnızca anapara geri ödenir. 6 yılda kapanış hedefi." },
  ],
};

export const HOME_MODEL_CHAIN = [
  { id: "kaynak", title: "Kaynaklar", icon: "users", detail: "Vakıf · Sukuk · Kitle fonlaması · Hibe · Karz-ı Hasen" },
  { id: "havuz", title: "Havuzlar", icon: "coins", detail: "Ayrı izlenen fon yapısı" },
  { id: "varlik", title: "Varlıklar", icon: "sun", detail: "RO üniteleri, güneş · depo" },
  { id: "hizmet", title: "Hizmet", icon: "droplets", detail: "Temiz su, sanitasyon" },
  { id: "etki", title: "Etki", icon: "trending-up", detail: "Erişim, sağlık, istihdam" },
] as const;

export const HOME_IMPACT = {
  items: [
    {
      id: "people",
      icon: "users",
      prefix: "~",
      value: "865.000",
      text: "kişi temiz suya erişir",
      sub: "10 yıl temel senaryo",
    },
    {
      id: "capacity",
      icon: "building",
      prefix: "≈",
      value: "26.000",
      text: "m³/gün su kapasitesi",
      sub: "olgun yıl",
    },
    {
      id: "sroi",
      icon: "heart-pulse",
      prefix: "≈",
      value: "4,3×",
      text: "SROI",
      sub: "~430 mn $ sosyal değer",
    },
    {
      id: "jobs",
      icon: "users-round",
      prefix: "≈",
      value: "700",
      text: "doğrudan+dolaylı istihdam",
      sub: "10 yıl temel senaryo",
    },
  ],
};
