import { Link } from "@tanstack/react-router";
import data from "@/data/gdaf";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import {
  Droplets,
  TrendingUp,
  Shield,
  Users,
  DollarSign,
  Home,
  ChevronDown,
  MapPin,
  Zap,
  Factory,
  Hospital,
} from "lucide-react";

const KPI_CARDS = [
  {
    label: "Etkilenen nüfus",
    value: "2,13M",
    icon: Users,
    tone: "text-water",
    bg: "bg-water/10",
    source: "PCBS",
  },
  {
    label: "Yerinden edilmiş",
    value: "1,9M",
    icon: Home,
    tone: "text-risk",
    bg: "bg-risk/10",
    source: "OCHA",
  },
  {
    label: "Mevcut su erişimi",
    value: "6,1 L",
    sub: "kişi/gün",
    icon: Droplets,
    tone: "text-water",
    bg: "bg-water/10",
    source: "WASH R3",
  },
  {
    label: "WHO acil standardı",
    value: "15 L",
    sub: "kişi/gün",
    icon: Shield,
    tone: "text-impact",
    bg: "bg-impact/10",
    source: "WHO",
  },
  {
    label: "Ulaşılan kişi (olgun)",
    value: "250K+",
    icon: Users,
    tone: "text-impact",
    bg: "bg-impact/10",
    source: "temsili senaryo",
  },
  {
    label: "Yeniden inşa ihtiyacı",
    value: "2,7 Mrd $",
    icon: DollarSign,
    tone: "text-finance",
    bg: "bg-finance/10",
    source: "BM/OCHA",
  },
];

const SCENARIOS = [
  {
    key: "base",
    label: "Temel Senaryo",
    tone: "border-impact bg-impact/5",
    dot: "bg-impact",
    summary: "Olgun yıl geliri yaklaşık 11 mn $",
    positive: true,
  },
  {
    key: "stress",
    label: "Stres Senaryosu",
    tone: "border-risk bg-risk/5",
    dot: "bg-risk",
    summary: "Gelir 7,5 mn $'a düşer · yıllık 1,5 mn $ açık",
    positive: false,
  },
  {
    key: "optimistic",
    label: "İyimser Senaryo",
    tone: "border-water bg-water/5",
    dot: "bg-water",
    summary: "Ek sukuk, yerel üretim, sistemsel altyapı",
    positive: true,
  },
] as const;

const IMPACT_SUMMARY = [
  { label: "Temiz su kapasitesi", value: "1.500 m³+", positive: true },
  { label: "Aktif WASH birimi", value: "60+", positive: true },
  { label: "Yerel istihdam", value: "100+", positive: true },
  { label: "DSRA dayanımı", value: "≈10 yıl", positive: true },
];

const FINANCE_POOLS = data.financial_architecture.separate_pools.map(
  (p: { pool: string; amount: string }) => ({
    name: p.pool.replace(" havuzu", "").replace(" sosyal katmanı", ""),
    amount: p.amount,
  }),
);

const IMPACT_MATRIX = [
  { metric: "Su erişimi", current: 6, target: 15 },
  { metric: "Sanitasyon", current: 26, target: 75 },
  { metric: "WASH birimi", current: 5, target: 60 },
  { metric: "İstihdam", current: 10, target: 100 },
  { metric: "Sosyal hizmet", current: 20, target: 85 },
];

const MAP_LEGEND = [
  { label: "Pompa istasyonu", color: "bg-water", icon: Zap },
  { label: "Su deposu", color: "bg-water-soft", icon: Droplets },
  { label: "Sağlık merkezi", color: "bg-impact", icon: Hospital },
  { label: "Üretim tesisi", color: "bg-finance", icon: Factory },
];

function GazaMap() {
  const zones = data.governorate_data.filter(
    (z: { area: string }) => z.area !== "Tüm Gaza",
  );
  const latMin = 31.22;
  const latMax = 31.59;
  const lonMin = 34.22;
  const lonMax = 34.55;

  const toPos = (lat: number, lon: number) => ({
    left: `${((lon - lonMin) / (lonMax - lonMin)) * 82 + 9}%`,
    top: `${((latMax - lat) / (latMax - latMin)) * 78 + 11}%`,
  });

  return (
    <div className="relative w-full h-full min-h-[280px] rounded-lg overflow-hidden bg-[oklch(0.94_0.02_155)]">
      <svg
        viewBox="0 0 400 520"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M 60 80 L 340 60 L 360 200 L 350 380 L 320 460 L 80 480 L 50 300 Z"
          fill="oklch(0.88 0.03 145)"
          stroke="oklch(0.75 0.05 155)"
          strokeWidth="1.5"
        />
        <path
          d="M 80 120 L 300 100 L 310 250 L 290 400 L 100 420 L 70 250 Z"
          fill="oklch(0.82 0.04 155)"
          stroke="oklch(0.70 0.06 155)"
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>

      {zones.map((z: { area: string; lat: number; lon: number; under_6L_pct: number }) => {
        const pos = toPos(z.lat, z.lon);
        const severity = z.under_6L_pct > 50 ? "bg-risk" : "bg-finance";
        return (
          <div
            key={z.area}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: pos.left, top: pos.top }}
          >
            <div className={`w-3 h-3 rounded-full ${severity} ring-2 ring-white shadow-sm`} />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden group-hover:block z-10 whitespace-nowrap bg-ink text-white text-[10px] px-2 py-1 rounded-md shadow-lg">
              {z.area} · {z.under_6L_pct}% &lt;6L
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
        {["Gazze City", "Khan Younis", "Deir Al-Balah", "Middle Area"].map((a) => (
          <span
            key={a}
            className="text-[9px] px-2 py-0.5 rounded-full bg-white/80 text-muted-foreground border border-rule"
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}

function FinanceRing({ pct, color }: { pct: number; color: string }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width="72" height="72" className="shrink-0">
      <circle cx="36" cy="36" r={r} fill="none" stroke="var(--color-rule)" strokeWidth="6" />
      <circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 36 36)"
      />
      <text x="36" y="40" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
        {pct}%
      </text>
    </svg>
  );
}

export function Dashboard() {
  const poolPcts = [50, 25, 10, 15];
  const poolColors = [
    "var(--color-impact)",
    "var(--color-water)",
    "var(--color-water-soft)",
    "var(--color-finance)",
  ];

  return (
    <div className="space-y-6">
      {/* Intro banner */}
      <div className="dash-card p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="eyebrow mb-3 text-water">GDAF Impact Simulator</div>
            <h1 className="text-2xl md:text-3xl font-semibold text-ink leading-tight">
              Gazze İçin Dirençli Etki ve Altyapı Modeli
            </h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Katılım finans temelli temiz su, sanitasyon ve güneş destekli WASH
              yeniden yapılanma modeli için interaktif sunum.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              {[
                { icon: Droplets, label: "WASH Odaklı" },
                { icon: TrendingUp, label: "Veriye Dayalı" },
                { icon: Shield, label: "Dirençli Gelecek" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-7 h-7 rounded-lg bg-water/10 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-water" />
                  </div>
                  {label}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Link
              to="/detay"
              hash="simulasyon"
              className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Simülasyonu Başlat
            </Link>
            <Link
              to="/detay"
              className="px-5 py-2.5 border border-rule text-sm font-medium rounded-lg hover:border-water hover:text-water transition-colors"
            >
              Raporlar
            </Link>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {KPI_CARDS.map((k) => (
          <div key={k.label} className="dash-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div className={`w-8 h-8 rounded-lg ${k.bg} flex items-center justify-center shrink-0`}>
                <k.icon className={`w-4 h-4 ${k.tone}`} />
              </div>
            </div>
            <div className="mt-3 text-[10px] uppercase tracking-wide text-muted-foreground leading-tight">
              {k.label}
            </div>
            <div className={`text-xl font-semibold mt-1 ${k.tone}`}>{k.value}</div>
            {k.sub && <div className="text-[10px] text-muted-foreground">{k.sub}</div>}
            <div className="mt-2 text-[9px] text-muted-foreground/70">{k.source}</div>
          </div>
        ))}
      </div>

      {/* Map + Scenarios */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 dash-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="eyebrow mb-1">Altyapı Haritası</div>
              <h2 className="text-base font-semibold text-ink flex items-center gap-2">
                <MapPin className="w-4 h-4 text-water" />
                Gazze Altyapı Haritası
              </h2>
            </div>
            <Link to="/detay" hash="lojistik" className="text-xs text-water hover:underline">
              Detay →
            </Link>
          </div>
          <div className="grid md:grid-cols-[140px_1fr] gap-4">
            <div className="space-y-2">
              <div className="eyebrow">Lejant</div>
              {MAP_LEGEND.map((l) => (
                <div key={l.label} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                  {l.label}
                </div>
              ))}
              <div className="pt-2 space-y-1">
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <div className="w-2.5 h-2.5 rounded-full bg-risk" /> Yüksek risk bölgesi
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <div className="w-2.5 h-2.5 rounded-full bg-finance" /> Orta risk bölgesi
                </div>
              </div>
            </div>
            <GazaMap />
          </div>
        </div>

        <div className="space-y-4">
          <div className="dash-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="eyebrow mb-1">Senaryolar</div>
                <h2 className="text-base font-semibold text-ink">Senaryo Karşılaştırması</h2>
              </div>
              <Link to="/detay" hash="senaryo" className="text-xs text-water hover:underline">
                Detay →
              </Link>
            </div>
            <div className="space-y-2">
              {SCENARIOS.map((s) => (
                <div
                  key={s.key}
                  className={`rounded-lg border p-3 ${s.tone}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                    <span className="text-xs font-semibold text-ink">{s.label}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug pl-4">
                    {s.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="dash-card p-5">
            <div className="eyebrow mb-3">Etki Özeti</div>
            <div className="grid grid-cols-2 gap-2">
              {IMPACT_SUMMARY.map((item) => (
                <div key={item.label} className="rounded-lg bg-surface-2 p-3">
                  <div className="text-lg font-semibold text-impact">{item.value}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Finance + Impact matrix */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="dash-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="eyebrow mb-1">Finansman</div>
              <h2 className="text-base font-semibold text-ink">Finansman Modelleri ve Etki</h2>
            </div>
            <Link to="/detay" hash="mimari" className="text-xs text-water hover:underline">
              Detay →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {FINANCE_POOLS.slice(0, 4).map((pool, i) => (
              <div key={pool.name} className="rounded-lg border border-rule p-3 flex items-center gap-3">
                <FinanceRing pct={poolPcts[i] ?? 20} color={poolColors[i] ?? "var(--color-water)"} />
                <div>
                  <div className="text-xs font-semibold text-ink leading-tight">{pool.name}</div>
                  <div className="text-sm font-semibold text-water mt-0.5">{pool.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="eyebrow mb-1">Etki Analizi</div>
              <h2 className="text-base font-semibold text-ink">Etki Matrisi</h2>
            </div>
            <Link to="/detay" hash="etki" className="text-xs text-water hover:underline">
              Detay →
            </Link>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={IMPACT_MATRIX} barGap={2} barCategoryGap="20%">
                <XAxis
                  dataKey="metric"
                  tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-rule)",
                    borderRadius: "8px",
                    fontSize: "11px",
                  }}
                />
                <Bar dataKey="current" name="Mevcut" radius={[4, 4, 0, 0]} barSize={14}>
                  {IMPACT_MATRIX.map((_, i) => (
                    <Cell key={i} fill="oklch(0.82 0.02 145)" />
                  ))}
                </Bar>
                <Bar dataKey="target" name="5 Yıllık Hedef" radius={[4, 4, 0, 0]} barSize={14}>
                  {IMPACT_MATRIX.map((_, i) => (
                    <Cell key={i} fill="var(--color-impact)" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-2 justify-center">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <div className="w-3 h-3 rounded-sm bg-[oklch(0.82_0.02_145)]" /> Mevcut Durum
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <div className="w-3 h-3 rounded-sm bg-impact" /> 5 Yıllık Hedef
            </div>
          </div>
        </div>
      </div>

      {/* CTA to details */}
      <div className="dash-card p-8 text-center">
        <div className="eyebrow mb-3">Tam Sunum</div>
        <h2 className="text-xl font-semibold text-ink mb-2">
          Kriz analizi, finansal mimari ve senaryolar
        </h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6">
          Tüm bölümleri kaydırılabilir sunum formatında inceleyin: kriz verileri,
          GDAF modeli, yıl simülasyonu, lojistik ve teknik ek.
        </p>
        <Link
          to="/detay"
          className="inline-flex flex-col items-center gap-2 group"
        >
          <span className="px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
            Ayrıntıları Gör
          </span>
          <ChevronDown className="w-5 h-5 text-water animate-bounce group-hover:text-primary transition-colors" />
        </Link>
      </div>
    </div>
  );
}
