import gdaf from "./gdaf";

export const SITE = {
  name: "Gazze Etki Simülatörü",
  subtitle: "GDAF Impact Simulator",
  tagline:
    "Katılım finans temelli temiz su, sanitasyon ve güneş destekli WASH yeniden yapılanma modeli için interaktif jüri sunum prototipi.",
  prototypeWarning:
    "Prototip — statik veri — jüri sunumu amaçlı. Gerçek operasyonel sistem değildir.",
};

export const HUB_NAV = [
  { to: "/" as const, label: "Ana Sayfa", match: (p: string) => p === "/" },
  { to: "/kriz" as const, label: "Kriz", match: (p: string) => p.startsWith("/kriz") },
  { to: "/model" as const, label: "Model", match: (p: string) => p.startsWith("/model") },
  { to: "/finansman" as const, label: "Finansman", match: (p: string) => p.startsWith("/finansman") },
  { to: "/senaryolar" as const, label: "Senaryolar", match: (p: string) => p.startsWith("/senaryolar") },
  { to: "/etki" as const, label: "Etki", match: (p: string) => p.startsWith("/etki") },
  { to: "/degerlendirme" as const, label: "Değerlendirme", match: (p: string) => p.startsWith("/degerlendirme") },
  { to: "/teknik-ek" as const, label: "Teknik Ek", match: (p: string) => p.startsWith("/teknik-ek") },
] as const;

export const DASHBOARD_KPIS = [
  { label: "Etkilenen nüfus", value: "2.130.000", kind: "rapor" as const, source: "OCHA/PCBS" },
  { label: "Yerinden edilmiş", value: "1.900.000", kind: "rapor" as const, source: "OCHA" },
  { label: "Mevcut su erişimi", value: "6,1 L/kişi/gün", kind: "rapor" as const, source: "WASH güncellemesi" },
  { label: "WHO acil standardı", value: "15 L/kişi/gün", kind: "rapor" as const, source: "WHO" },
  { label: "Savaş öncesi erişim", value: "82,7 L/kişi/gün", kind: "rapor" as const, source: "—" },
  { label: "Yeniden inşa ihtiyacı (WASH)", value: "2,7 Mrd $", kind: "rapor" as const, source: "RDNA 2026" },
];

export const SCENARIO_SUMMARY = [
  {
    key: "base",
    label: "Temel Senaryo",
    summary: "Olgun yıl geliri ≈ 11 mn $ · sürdürülebilir",
    tone: "border-impact bg-impact/5",
    dot: "bg-impact",
  },
  {
    key: "stress",
    label: "Olumsuz (Stres)",
    summary: "Gelir 7,5 mn $ · yıllık 1,5 mn $ açık · DSRA tamponu",
    tone: "border-risk bg-risk/5",
    dot: "bg-risk",
  },
  {
    key: "optimistic",
    label: "İyimser Senaryo",
    summary: "Ek sukuk, yerel üretim, sistemsel altyapı",
    tone: "border-water bg-water/5",
    dot: "bg-water",
  },
];

export const IMPACT_MATRIX = [
  { metric: "Temiz su erişimi", current: 6, target: 15 },
  { metric: "Sanitasyon", current: 26, target: 75 },
  { metric: "WASH birimi", current: 5, target: 60 },
  { metric: "İstihdam", current: 10, target: 100 },
  { metric: "Sosyal hizmet", current: 20, target: 85 },
];

export const KRIZ_SECTIONS = [
  { id: "su-krizi", label: "Su Krizi" },
  { id: "nufus", label: "Nüfus & Yerinden Edilme" },
  { id: "saglik", label: "Sağlık Yükü" },
  { id: "altyapi", label: "Altyapı Hasarı" },
];

export const MODEL_SECTIONS = [
  { id: "neden-yeni", label: "Neden Yeni Model?" },
  { id: "kavramsal", label: "Kavramsal Temel" },
  { id: "kurumsal", label: "Kurumsal Yapı" },
  { id: "araclar", label: "Finansal Araçlar" },
  { id: "zincir", label: "Paradan Etkiye" },
  { id: "fikhi", label: "Fıkhî Uygunluk" },
  { id: "hukuki", label: "Hukuki Çerçeve" },
];

export const FINANSMAN_SECTIONS = [
  { id: "kaynak", label: "Kaynak Kompozisyonu" },
  { id: "tahsis", label: "Fon Tahsis Planı" },
  { id: "havuzlar", label: "Havuz Ayrımı" },
  { id: "gelir", label: "Gelir Varsayımları" },
  { id: "selale", label: "Gelir Şelalesi" },
  { id: "karz", label: "Karz-ı Hasen & Rezerv" },
];

export const SENARYO_SECTIONS = [
  { id: "temel", label: "Temel Senaryo" },
  { id: "stres", label: "Olumsuz Senaryo" },
  { id: "iyimser", label: "İyimser Senaryo" },
  { id: "simulasyon", label: "Yıl Simülasyonu" },
  { id: "karsilastirma", label: "Karşılaştırma" },
];

export const ETKI_SECTIONS = [
  { id: "kpi", label: "KPI'lar (3 Ölçek)" },
  { id: "maliyet", label: "Maliyet-Etkinlik & SROI" },
  { id: "sosyal", label: "Sosyal Modüller" },
  { id: "izleme", label: "İzleme & Doğrulama" },
];

export const DEGERLENDIRME_SECTIONS = [
  { id: "karsilastirma", label: "Karşılaştırmalı Değerlendirme" },
  { id: "risk", label: "Risk Matrisi" },
  { id: "sonuc", label: "Sonuç & Politika" },
];

export const TEKNIK_SECTIONS = [
  { id: "varsayim", label: "Varsayımlar" },
  { id: "kaynaklar", label: "Veri Kaynakları" },
  { id: "kpi", label: "KPI Tanımları" },
  { id: "kurallar", label: "Havuz Kuralları" },
  { id: "kaynakca", label: "Kaynakça" },
  { id: "ai", label: "YZ Kullanım Notu" },
];

export const WHY_FAILS_CARDS = [
  {
    title: "Hibe / insani yardım",
    points: ["CAPEX var, OPEX yok", "Bağışçı yorgunluğu", "Öngörülemez fon akışı", "2025 Flash Appeal karşılanma oranı düşük"],
  },
  {
    title: "Borçlanma / kredi",
    points: ["Egemen garanti sorunu", "Faizli borç katılım finansa uyumsuz", "Zayıf geri ödeme zemini", "Kurumsal kırılganlık"],
  },
  {
    title: "Özel yatırım",
    points: ["Çatışma ve abluka riski", "WASH sektörüne düşük ticari ilgi", "Geri dönüş ufku belirsiz"],
  },
  {
    title: "Sosyal koruma / mikrofinans",
    points: ["Tüketim açığını kısmen kapatır", "Altyapı dönüşümü üretmez", "Ölçek sınırlı"],
  },
];

export const LITERATURE = [
  "İstisna–İcara sukuk (Lawal & Sani-Yahuza)",
  "Nakit vakıf destekli sukuk (Endonezya)",
  "Sukuk Prihatin (Malezya)",
  "Takaful & mikrofinans (Migdad 2023)",
  "Çatışma sonrası yeniden inşa (Pokorny 2026; Alhemdiat 2026; Barakat 2018)",
];

export const FINANCIAL_INSTRUMENTS = [
  { name: "İstisna + İcara", desc: "Birincil akit: üretim/inşa (istisna) + kiralama/kullanım (icara)" },
  { name: "Müşareke", desc: "Kitle fonlamasıyla mikro modüler varlık ortaklığı (kâr paylaşımı)" },
  { name: "Vakıf (vakfe)", desc: "Dokunulmaz anapara; yalnızca getirisi kullanılır (çekirdek istikrar)" },
  { name: "Karz-ı Hasen", desc: "Faizsiz borç; tam bağışçı olmak istemeyene ara mekanizma; sadece anapara döner" },
  { name: "Tekafül", desc: "Yalnızca operasyonel riskler (savaş/mücbir sebep hariç)" },
  { name: "Rezerv Fonu (DSRA)", desc: "Likidite kesintisi tamponu; her havuz için %10–20 zorunlu" },
];

export const FIKHI_POINTS = [
  "AAOIFI Şer'i Standart No.17 & IFSB uyumu",
  "Garanti olmaması: sosyal etkili sukuk ≠ ticari sukuk; anapara/getiri taahhüdü yoktur",
  "Getiri piyasanın altında; yatırımcı motivasyonu etki + itibar + etik",
  "Her araç için ayrı fıkhî dayanak ve gelir hakkı kuralı",
];

export const LEGAL_LAYERS = [
  { title: "İç güvence", items: ["Şer'i denetim kurulu", "İç mali denetim", "Risk komitesi"] },
  { title: "Bağımsız dış denetim", items: ["Uluslararası firma, yılda ≥1", "Sahada fiziksel varlık doğrulaması"] },
  { title: "Çok taraflı gözetim", items: ["Bağışçı ülkeler", "Katılım finans kurumları", "Kalkınma kuruluşları"] },
];

export const POOL_WARNINGS = [
  "Müşareke geliri sukuk yatırımcısına aktarılamaz.",
  "Hibe / sosyal hizmet fonu yatırımcı ödemelerinde kullanılamaz.",
  "Vakıf ana parası korunur; yalnızca getirisi kullanılır.",
];

export const IMPACT_KPI_3SCALE = [
  { indicator: "Su kapasitesi (m³/gün)", phase1: "≈ 8.000", base: "≈ 26.000", optimistic: "≈ 100.000" },
  { indicator: "Erişen kişi (30 L/gün)", phase1: "≈ 265.000", base: "≈ 865.000", optimistic: "Nüfusun büyük kısmı" },
  { indicator: "Güneş kapasitesi (MWp)", phase1: "≈ 1,5", base: "≈ 4,8", optimistic: "Onlarca MWp" },
  { indicator: "Önlenen CO₂ (ton/yıl)", phase1: "≈ 1.700", base: "≈ 5.600", optimistic: "On binlerce" },
  { indicator: "Doğrudan+dolaylı istihdam", phase1: "≈ 300", base: "≈ 700", optimistic: "1.500–3.000" },
  { indicator: "Karbon kredisi geliri", phase1: "0", base: "0 (baz)", optimistic: "2–3 mn $/yıl (yıl 8–10'dan)" },
];

export const IMPACT_RATIOS = [
  { label: "Kişi başı yatırım maliyeti", value: "≈ 75 $/kişi (Faz 1)", source: "20 mn $ ÷ ~265.000 kişi" },
  { label: "Su kapasitesi birim maliyeti", value: "≈ 2.500 $/(m³·gün)", source: "Deir el-Balah çapası (Mizyed 2025)" },
  { label: "İdari (Vekâlet) gider oranı", value: "≈ %3,7", source: "Tipik insani yardımın altında" },
  { label: "Programa ulaşan kaynak oranı", value: "> %96", source: "İdari hariç tüm kaynak hizmete" },
  { label: "Sosyal geri dönüş (SROI)", value: "≈ 4,3×", source: "≈ 430 mn $ sosyal değer" },
  { label: "Dizel ikamesi tasarrufu", value: "0,7–1,1 mn $/yıl", source: "2,3 GWh × 0,30–0,46 $/kWh" },
];

export const SOCIAL_MODULES = [
  "Kadın hijyeni modülü",
  "İkincil su yeniden kullanımı",
  "Yerel hafıza ve topluluk sahipliği",
  "Okul/klinik hijyen istasyonları",
  "Yerel dağıtım ekipleri",
  "Ayni kurumsal katkı",
];

export const MONITORING = [
  "Saha ölçümü ile su kapasitesi ve erişim doğrulaması",
  "Bağımsız dış denetim ile finansal ve varlık raporlaması",
  "Dijital izlenebilirlik ile fon akışı şeffaflığı",
  "Yerel topluluk geri bildirimi ile hizmet kalitesi",
];

export const COMPARISON_ROWS = [
  { feature: "Kaynak sıralaması (vakıf/hibe önce)", gdaf: true, sukuk_only: false, grant_only: true, micro: false, ppp: false },
  { feature: "Vakıf anaparası dokunulmaz", gdaf: true, sukuk_only: false, grant_only: false, micro: false, ppp: false },
  { feature: "Modüler erken hizmet", gdaf: true, sukuk_only: false, grant_only: false, micro: true, ppp: false },
  { feature: "OPEX sürekliliği", gdaf: true, sukuk_only: false, grant_only: false, micro: false, ppp: true },
  { feature: "Fıkhî uygunluk (faizsiz)", gdaf: true, sukuk_only: true, grant_only: true, micro: true, ppp: false },
  { feature: "Net çıkış stratejisi", gdaf: true, sukuk_only: false, grant_only: false, micro: false, ppp: true },
];

export const POLICY_RECOMMENDATIONS = [
  "Katılım bankaları: sosyal etkili sukuk ihraçlarında GDAF havuz ayrımı modelini referans almalı",
  "Bağışçı ülkeler: vakıf + hibe katmanını önceliklendirmeli; sukuk'u tamamlayıcı görmeli",
  "Kalkınma kuruluşları: modüler WASH varlıkları için ölçülebilir etki KPI'larını standartlaştırmalı",
  "Yerel topluluklar: bakım ve teknik eğitim merkezlerine sahiplik rolü verilmeli",
];

export const SCENARIO_COMPARISON = [
  { scenario: "Temel", revenue: "≈ 11 mn $", expense: "≈ 9 mn $", result: "Sürdürülebilir; pozitif serbest nakit" },
  { scenario: "Olumsuz (stres)", revenue: "≈ 7,5 mn $", expense: "≈ 9 mn $", result: "Açık; DSRA+vakıf+hibe ile yıllarca dayanır" },
  { scenario: "İyimser", revenue: "17–40 mn $", expense: "9,5+ mn $", result: "Kendine yeter; büyük altyapıya geçer" },
];

export const BASE_SCENARIO_YEARS = [
  { year: 1, micro: 2, production: 0, waqf: 5, total: 7, net: -1.5 },
  { year: 2, micro: 2, production: 1, waqf: 5, total: 8, net: -0.7 },
  { year: 3, micro: 2, production: 4, waqf: 5, total: 11, net: 2 },
  { year: 5, micro: 2, production: 4, waqf: 5, total: 11, net: 2 },
  { year: 6, micro: 2, production: 4, waqf: 5, total: 11, net: 2 },
  { year: 10, micro: 2, production: 4, waqf: 5, total: 11, net: 4 },
];

export const STRESS_SCENARIO_YEARS = [
  { year: 1, revenue: 7, expense: 8.5, gap: -1.5, dsra: 13.5 },
  { year: 2, revenue: 8, expense: 8.7, gap: -0.7, dsra: 12.8 },
  { year: 3, revenue: 7.5, expense: 9, gap: -1.5, dsra: 11.3 },
  { year: 5, revenue: 7.5, expense: 9, gap: -1.5, dsra: 8.3 },
  { year: 7, revenue: 8, expense: 7, gap: 1, dsra: 7.8 },
];

export const OPTIMISTIC_MILESTONES = [
  { year: 1, revenue: 7, sukuk: 50, phase: "Üretim tesisi kurulumu", carbon: 0 },
  { year: 3, revenue: 12, sukuk: 50, phase: "Tesis tam kapasite", carbon: 0 },
  { year: 6, revenue: 16, sukuk: 120, phase: "Gazze'ye yerelleşme başlar", carbon: 0 },
  { year: 10, revenue: 24, sukuk: 350, phase: "Yerel üretim + montaj", carbon: 2 },
  { year: 15, revenue: 40, sukuk: 500, phase: "Büyük altyapı devrede", carbon: 3 },
];

export const POOL_RULES = [
  "Sukuk havuzu yalnızca sukuk varlıklarının gelirini sukuk yatırımcısına dağıtır.",
  "Müşareke havuzu geliri yalnızca kitle fonlaması yatırımcılarına aittir; sukuk havuzuna aktarılamaz.",
  "Vakıf anaparası dokunulmazdır; yalnızca yıllık getirisi işletme, rezerv ve sosyal hizmete yönlendirilir.",
  "Hibe ve karz-ı hasen sosyal katmanı yatırımcı ödemeleri için kullanılamaz.",
  "Tekafül havuzu sadece operasyonel riskler içindir; savaş/abluka kapsam dışıdır.",
  "DSRA likidite kesintilerine karşı tampondur; planlı yatırımlar için kullanılmaz.",
  "Sukuk toplam kaynağın ~%25'i ile sınırlıdır; birincil kaynak değildir.",
];

export const REFERENCES = [
  "AAOIFI 2015", "IFSB-1/IFSB-10", "Migdad 2023", "Pokorny 2026", "Alhemdiat 2026",
  "Buheji & Marouf 2024", "Ghanem & Maghen 2026", "Mizyed 2025", "Rantissi 2024",
  "Lawal & Sani-Yahuza", "Al-Asadi 2021", "Barakat 2018", "Zaqout 2024",
];

export const KPI_DEFINITIONS = [
  ["Ulaşılan kişi", "Aktif cihaz portföyü tarafından doğrudan hizmet verilen tahmini birey sayısı."],
  ["Aktif WASH birimi", "Hizmet veren tüm modüler, konteyner ve büyük WASH varlıklarının toplam sayısı."],
  ["Günlük temiz su kapasitesi", "Cihaz portföyünün teorik günlük üretim/dağıtım kapasitesi (m³)."],
  ["Fon kullanım verimliliği", "(Toplam kaynak − idari/yönetim gideri) / toplam kaynak."],
  ["DSRA dayanımı", "Mevcut DSRA bakiyesinin yıllık beklenen açığa bölünmesi (yıl)."],
  ["İdari gider oranı", "Vekâlet ücreti dahil yönetim giderinin toplam yıllık gelire oranı."],
] as const;

export const ASSUMPTIONS = [
  { label: "Toplam kaynak", value: "200 mn $ (Faz 1 varsayımsal büyüklük)" },
  { label: "Vakıf getirisi", value: "Yıllık ~%5 (anapara korunur)" },
  { label: "Üretim tesisi", value: "3. yıldan itibaren gelir üretir; ~%8 getiri" },
  { label: "Mikro varlıklar", value: "1. yıldan gelir; ~%10 getiri" },
  { label: "Karz-ı hasen", value: "6 yılda kapanır, yıllık 2 mn $ ödeme" },
  { label: "DSRA", value: "15 mn $; stres yılında yıllık 1,5 mn $ açığı ~10 yıl karşılayabilir" },
  { label: "Kişi başı su standardı", value: "15–50 L/gün (erişen kişi hesabında aralık)" },
];

export { gdaf };
