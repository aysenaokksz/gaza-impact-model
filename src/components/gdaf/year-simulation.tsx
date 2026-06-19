import { useMemo, useState } from "react";
import data from "@/data/gdaf";
import { Section, DataTag } from "./chrome";

type AssetKind = "small" | "medium" | "large" | "facility" | "training" | "assembly";

interface Marker {
  id: string;
  kind: AssetKind;
  // lon/lat
  lon: number;
  lat: number;
  appearsAt: number; // year index
  name: string;
  pool: string;
  capacity: string;
  reached: string;
  status: string;
}

const YEARS = [
  { key: "y1", label: "Yıl 1", idx: 1 },
  { key: "y2", label: "Yıl 2", idx: 2 },
  { key: "y3", label: "Yıl 3", idx: 3 },
  { key: "y5", label: "Yıl 5", idx: 5 },
  { key: "y6", label: "Yıl 6", idx: 6 },
  { key: "y10", label: "Yıl 10", idx: 10 },
  { key: "y15", label: "Yıl 15", idx: 15 },
  { key: "y15p", label: "Yıl 15+", idx: 99 },
];

// Disciplined deployment near actual settlements
// Approx Gaza Strip bbox: lon 34.20-34.57, lat 31.22-31.60
function makeMarkers(): Marker[] {
  // Settlements (lon, lat) approximate
  const ZONES = [
    { name: "Gaza City", lon: 34.470, lat: 31.515 },
    { name: "Jabalia", lon: 34.483, lat: 31.535 },
    { name: "Beit Lahia", lon: 34.500, lat: 31.553 },
    { name: "Nuseirat", lon: 34.391, lat: 31.452 },
    { name: "Deir al-Balah", lon: 34.354, lat: 31.418 },
    { name: "Khan Younis", lon: 34.306, lat: 31.343 },
    { name: "Rafah", lon: 34.245, lat: 31.290 },
  ];

  const list: Marker[] = [];
  const push = (m: Omit<Marker, "id">) =>
    list.push({ ...m, id: `m${list.length + 1}` });

  // Year 1 — 5 small pilot units (mobile RO) across north/middle/south
  const y1 = [
    { z: ZONES[0], dx: -0.02, dy: 0.01 },
    { z: ZONES[3], dx: 0.01, dy: -0.005 },
    { z: ZONES[5], dx: -0.015, dy: 0.012 },
    { z: ZONES[6], dx: 0.005, dy: 0.0 },
    { z: ZONES[1], dx: 0.01, dy: 0.008 },
  ];
  y1.forEach((p) =>
    push({
      kind: "small",
      lon: p.z.lon + p.dx,
      lat: p.z.lat + p.dy,
      appearsAt: 1,
      name: `Mobil RO · ${p.z.name}`,
      pool: "Hibe + Karz-ı Hasen",
      capacity: "≈ 5.000 L/gün",
      reached: "≈ 1.500 kişi",
      status: "Aktif pilot",
    })
  );

  // Year 2 — add 10 more units (small/medium) across more zones
  const y2Spots = [
    { z: ZONES[0], dx: 0.015, dy: -0.012, kind: "medium" },
    { z: ZONES[0], dx: -0.025, dy: -0.015, kind: "small" },
    { z: ZONES[1], dx: -0.012, dy: -0.008, kind: "small" },
    { z: ZONES[2], dx: 0.005, dy: -0.01, kind: "medium" },
    { z: ZONES[3], dx: -0.018, dy: 0.012, kind: "small" },
    { z: ZONES[3], dx: 0.015, dy: 0.005, kind: "medium" },
    { z: ZONES[4], dx: 0.005, dy: -0.01, kind: "small" },
    { z: ZONES[5], dx: 0.012, dy: -0.012, kind: "medium" },
    { z: ZONES[5], dx: -0.02, dy: -0.005, kind: "small" },
    { z: ZONES[6], dx: -0.01, dy: 0.005, kind: "small" },
  ];
  y2Spots.forEach((p) =>
    push({
      kind: p.kind as AssetKind,
      lon: p.z.lon + p.dx,
      lat: p.z.lat + p.dy,
      appearsAt: 2,
      name: `${p.kind === "medium" ? "Konteyner RO + solar" : "Mobil RO"} · ${p.z.name}`,
      pool: "Hibe + Müşareke",
      capacity: p.kind === "medium" ? "≈ 20.000 L/gün" : "≈ 5.000 L/gün",
      reached: p.kind === "medium" ? "≈ 5.000 kişi" : "≈ 1.500 kişi",
      status: "Aktif",
    })
  );

  // Year 5 — broader spread (15 more, mostly medium)
  for (let i = 0; i < 15; i++) {
    const z = ZONES[i % ZONES.length];
    const dx = ((i * 37) % 60 - 30) / 1000;
    const dy = ((i * 53) % 60 - 30) / 1000;
    push({
      kind: i % 4 === 0 ? "large" : "medium",
      lon: z.lon + dx,
      lat: z.lat + dy,
      appearsAt: 5,
      name: `${i % 4 === 0 ? "Cihaz kümesi" : "Konteyner RO"} · ${z.name}`,
      pool: "Sukuk + Müşareke",
      capacity: i % 4 === 0 ? "≈ 60.000 L/gün" : "≈ 20.000 L/gün",
      reached: i % 4 === 0 ? "≈ 12.000 kişi" : "≈ 5.000 kişi",
      status: "Aktif",
    });
  }

  // Year 6 — modest additions (8 medium)
  for (let i = 0; i < 8; i++) {
    const z = ZONES[i % ZONES.length];
    push({
      kind: "medium",
      lon: z.lon + (((i * 19) % 40 - 20) / 1000),
      lat: z.lat + (((i * 23) % 40 - 20) / 1000),
      appearsAt: 6,
      name: `Konteyner RO · ${z.name}`,
      pool: "Sukuk + Vakıf",
      capacity: "≈ 20.000 L/gün",
      reached: "≈ 5.000 kişi",
      status: "Aktif",
    });
  }

  // Year 10 — maintenance / training center
  push({
    kind: "training",
    lon: 34.430,
    lat: 31.480,
    appearsAt: 10,
    name: "Gazze Bakım, Montaj ve Teknik Eğitim Merkezi",
    pool: "Sukuk II + Vakıf",
    capacity: "Yerel teknisyen kapasitesi",
    reached: "Tüm cihaz portföyü",
    status: "Aktif",
  });
  // plus 12 more medium units across map
  for (let i = 0; i < 12; i++) {
    const z = ZONES[i % ZONES.length];
    push({
      kind: i % 3 === 0 ? "large" : "medium",
      lon: z.lon + (((i * 29) % 50 - 25) / 1000),
      lat: z.lat + (((i * 31) % 50 - 25) / 1000),
      appearsAt: 10,
      name: `${i % 3 === 0 ? "WASH varlığı" : "Konteyner RO"} · ${z.name}`,
      pool: "Sukuk + Vakıf",
      capacity: i % 3 === 0 ? "≈ 60.000 L/gün" : "≈ 20.000 L/gün",
      reached: i % 3 === 0 ? "≈ 12.000 kişi" : "≈ 5.000 kişi",
      status: "Aktif",
    });
  }

  // Year 15 — local assembly line + more units
  push({
    kind: "assembly",
    lon: 34.395,
    lat: 31.425,
    appearsAt: 15,
    name: "Gazze Yerel Montaj / Üretim Hattı",
    pool: "Sukuk III + Yerel gelir",
    capacity: "Modüler cihaz yerelleşmesi",
    reached: "Bölgesel",
    status: "Aktif",
  });
  for (let i = 0; i < 15; i++) {
    const z = ZONES[i % ZONES.length];
    push({
      kind: i % 5 === 0 ? "large" : "medium",
      lon: z.lon + (((i * 41) % 60 - 30) / 1000),
      lat: z.lat + (((i * 17) % 60 - 30) / 1000),
      appearsAt: 15,
      name: `Yerel üretim cihazı · ${z.name}`,
      pool: "Yerel gelir + Sukuk",
      capacity: i % 5 === 0 ? "≈ 60.000 L/gün" : "≈ 25.000 L/gün",
      reached: i % 5 === 0 ? "≈ 14.000 kişi" : "≈ 6.000 kişi",
      status: "Aktif",
    });
  }

  // Year 15+ — large WASH infra
  push({
    kind: "facility",
    lon: 34.435,
    lat: 31.500,
    appearsAt: 99,
    name: "Merkezi Desalinasyon ve Ana İletim Altyapısı",
    pool: "Yeni sukuklar + Çok taraflı fonlar",
    capacity: "Büyük ölçekli sistemsel dönüşüm",
    reached: "Gazze geneli",
    status: "İyimser senaryo",
  });
  push({
    kind: "facility",
    lon: 34.305,
    lat: 31.330,
    appearsAt: 99,
    name: "Güney Gazze Atıksu Arıtma Tesisi",
    pool: "Yeni sukuklar + Hibe",
    capacity: "Atıksu altyapısı",
    reached: "Güney bölge",
    status: "İyimser senaryo",
  });

  return list;
}

const ALL_MARKERS = makeMarkers();

// Project lon/lat to SVG coords
const BBOX = { lon0: 34.18, lon1: 34.60, lat0: 31.22, lat1: 31.60 };
const W = 520;
const H = 720;

function project(lon: number, lat: number) {
  const x = ((lon - BBOX.lon0) / (BBOX.lon1 - BBOX.lon0)) * W;
  const y = H - ((lat - BBOX.lat0) / (BBOX.lat1 - BBOX.lat0)) * H;
  return { x, y };
}

const SIZE: Record<AssetKind, number> = {
  small: 4,
  medium: 7,
  large: 11,
  facility: 14,
  training: 12,
  assembly: 12,
};
const KIND_COLOR: Record<AssetKind, string> = {
  small: "var(--color-water)",
  medium: "var(--color-water)",
  large: "var(--color-water)",
  facility: "var(--color-impact)",
  training: "var(--color-finance)",
  assembly: "var(--color-finance)",
};
const KIND_LABEL: Record<AssetKind, string> = {
  small: "Mobil RO",
  medium: "Konteyner RO / Solar set",
  large: "Cihaz kümesi / büyük WASH varlığı",
  facility: "Büyük WASH altyapı tesisi",
  training: "Bakım & eğitim merkezi",
  assembly: "Yerel montaj hattı",
};

export function YearSimulationSection({ embedded = false }: { embedded?: boolean }) {
  const [year, setYear] = useState(YEARS[0]);
  const [hover, setHover] = useState<Marker | null>(null);

  const activeMarkers = useMemo(
    () => ALL_MARKERS.filter((m) => m.appearsAt <= year.idx),
    [year]
  );

  const stage = useMemo(() => {
    const map: Record<string, any> = {
      1: data.staged_assets_and_timeline[0],
      2: data.staged_assets_and_timeline[1],
      3: data.staged_assets_and_timeline[2],
      5: data.staged_assets_and_timeline[3],
      6: data.staged_assets_and_timeline[4],
      10: data.staged_assets_and_timeline[5],
      15: data.staged_assets_and_timeline[6],
      99: data.staged_assets_and_timeline[7],
    };
    return map[year.idx];
  }, [year]);

  // Computed indicators
  const units = activeMarkers.length;
  const dailyWater = activeMarkers.reduce((sum, m) => {
    const cap =
      m.kind === "small"
        ? 5000
        : m.kind === "medium"
        ? 20000
        : m.kind === "large"
        ? 60000
        : m.kind === "facility"
        ? 200000
        : 0;
    return sum + cap;
  }, 0);
  const reached = activeMarkers.reduce((sum, m) => {
    const r =
      m.kind === "small"
        ? 1500
        : m.kind === "medium"
        ? 5000
        : m.kind === "large"
        ? 12000
        : m.kind === "facility"
        ? 80000
        : 0;
    return sum + r;
  }, 0);
  const omCost = (units * 0.08).toFixed(2);
  const social =
    year.idx <= 2 ? "Acil" : year.idx <= 5 ? "Yükseliyor" : year.idx <= 10 ? "Yerleşik" : "Genişliyor";
  const activeSource = stage?.active_sources?.join(" · ") || "—";

  const inner = (
    <>
      {/* Timeline */}
      <div className="panel-2 p-3 mb-6 flex flex-wrap gap-1">
        {YEARS.map((y) => {
          const active = year.key === y.key;
          return (
            <button
              key={y.key}
              onClick={() => setYear(y)}
              className={`flex-1 min-w-[80px] px-3 py-3 text-sm tracking-wide rounded-sm transition-all ${
                active
                  ? "bg-water text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface"
              }`}
            >
              <div className="font-display text-base">{y.label}</div>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        {/* Map */}
        <div className="panel p-4 relative">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="eyebrow">Gazze · {year.label}</div>
              <div className="font-display text-lg mt-1">{stage?.scene}</div>
            </div>
            <DataTag kind="senaryo" />
          </div>

          <div className="relative bg-surface-2/60 rounded-sm overflow-hidden hairline">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
              {/* Sea background */}
              <defs>
                <linearGradient id="sea" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="rgba(120,170,210,0.10)" />
                  <stop offset="1" stopColor="rgba(120,170,210,0.04)" />
                </linearGradient>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
                </pattern>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>
              <rect width={W} height={H} fill="url(#sea)" />
              <rect width={W} height={H} fill="url(#grid)" />

              {/* Gaza Strip landmass (approximate coastline polygon) */}
              <path
                d="
                  M 65 700
                  L 95 660
                  L 120 620
                  L 150 565
                  L 175 510
                  L 205 460
                  L 235 405
                  L 268 355
                  L 290 310
                  L 318 270
                  L 350 220
                  L 380 180
                  L 410 130
                  L 440 80
                  L 470 40
                  L 510 25
                  L 510 720
                  Z
                "
                fill="rgba(155,170,180,0.10)"
                stroke="rgba(180,200,215,0.45)"
                strokeWidth="1.2"
              />

              {/* Israel/Egypt border line (eastern) */}
              <path
                d="M 510 25 L 510 720"
                stroke="rgba(180,200,215,0.25)"
                strokeWidth="0.8"
                strokeDasharray="3 5"
              />

              {/* City labels */}
              {[
                { name: "Beit Lahia", lon: 34.500, lat: 31.553 },
                { name: "Gaza City", lon: 34.470, lat: 31.515 },
                { name: "Nuseirat", lon: 34.391, lat: 31.452 },
                { name: "Deir al-Balah", lon: 34.354, lat: 31.418 },
                { name: "Khan Younis", lon: 34.306, lat: 31.343 },
                { name: "Rafah", lon: 34.245, lat: 31.290 },
              ].map((c) => {
                const { x, y } = project(c.lon, c.lat);
                return (
                  <g key={c.name}>
                    <circle cx={x} cy={y} r={1.5} fill="rgba(200,210,220,0.6)" />
                    <text
                      x={x + 7}
                      y={y + 3}
                      fontSize="10"
                      fill="rgba(200,210,220,0.6)"
                      fontFamily="Inter, sans-serif"
                    >
                      {c.name}
                    </text>
                  </g>
                );
              })}

              {/* Service network — dashed lines from training center to all medium/large in year 10+ */}
              {year.idx >= 10 &&
                activeMarkers
                  .filter((m) => m.kind === "medium" || m.kind === "large")
                  .map((m) => {
                    const a = project(34.430, 31.480);
                    const b = project(m.lon, m.lat);
                    return (
                      <line
                        key={`l-${m.id}`}
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        stroke="rgba(200,160,80,0.18)"
                        strokeWidth="0.6"
                        strokeDasharray="2 4"
                      />
                    );
                  })}

              {/* Markers */}
              {activeMarkers.map((m) => {
                const { x, y } = project(m.lon, m.lat);
                const r = SIZE[m.kind];
                const color = KIND_COLOR[m.kind];
                const fresh = m.appearsAt === year.idx;
                return (
                  <g
                    key={m.id}
                    onMouseEnter={() => setHover(m)}
                    onMouseLeave={() => setHover(null)}
                    style={{ cursor: "pointer" }}
                  >
                    {fresh && (
                      <circle
                        cx={x}
                        cy={y}
                        r={r + 4}
                        fill="none"
                        stroke={color}
                        strokeOpacity={0.35}
                      />
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={r}
                      fill={color}
                      fillOpacity={0.85}
                      stroke="var(--color-background)"
                      strokeWidth={1.2}
                    />
                    {(m.kind === "facility" || m.kind === "training" || m.kind === "assembly") && (
                      <circle
                        cx={x}
                        cy={y}
                        r={r + 2}
                        fill="none"
                        stroke={color}
                        strokeOpacity={0.4}
                        strokeWidth={1}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Hover card */}
            {hover && (
              <div className="absolute top-3 right-3 panel-2 p-4 max-w-[260px] text-xs space-y-1.5 pointer-events-none">
                <div className="font-display text-sm text-water">{hover.name}</div>
                <div className="text-muted-foreground">
                  <span className="text-foreground">Aktif yıl:</span> {hover.appearsAt === 99 ? "Yıl 15+" : `Yıl ${hover.appearsAt}`}
                </div>
                <div className="text-muted-foreground">
                  <span className="text-foreground">Varlık tipi:</span> {KIND_LABEL[hover.kind]}
                </div>
                <div className="text-muted-foreground">
                  <span className="text-foreground">Havuz:</span> {hover.pool}
                </div>
                <div className="text-muted-foreground">
                  <span className="text-foreground">Kapasite:</span> {hover.capacity}
                </div>
                <div className="text-muted-foreground">
                  <span className="text-foreground">Ulaşılan:</span> {hover.reached}
                </div>
                <div className="text-muted-foreground">
                  <span className="text-foreground">Durum:</span> {hover.status}
                </div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-muted-foreground">
            {(["small", "medium", "large", "training", "assembly", "facility"] as AssetKind[]).map((k) => (
              <div key={k} className="flex items-center gap-2">
                <span
                  className="rounded-full"
                  style={{
                    background: KIND_COLOR[k],
                    width: SIZE[k] * 1.4,
                    height: SIZE[k] * 1.4,
                  }}
                />
                {KIND_LABEL[k]}
              </div>
            ))}
          </div>
          <div className="mt-3 text-[10px] text-muted-foreground/70 leading-relaxed">
            Harita noktaları temsilîdir; gerçek kurulum lokasyonu olarak yorumlanmamalıdır.
          </div>
        </div>

        {/* Stage panel */}
        <aside className="space-y-4">
          <div className="panel p-5">
            <div className="eyebrow mb-2">Sahne notu</div>
            <div className="font-display text-lg leading-snug">{stage?.scene}</div>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              {stage?.message}
            </p>
          </div>

          <div className="panel p-5 space-y-3">
            <div className="eyebrow">Aktif finansman kaynağı</div>
            <div className="text-sm text-water leading-snug">{activeSource}</div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-rule rounded-sm overflow-hidden">
            <Kpi label="Aktif WASH birimi" value={String(units)} tone="water" />
            <Kpi label="Ulaşılan kişi" value={reached.toLocaleString("tr-TR")} tone="impact" />
            <Kpi
              label="Günlük temiz su"
              value={`${(dailyWater / 1000).toLocaleString("tr-TR")} m³`}
              tone="water"
            />
            <Kpi label="O&M maliyeti" value={`${omCost} mn $`} tone="finance" />
            <Kpi label="Sosyal etki yoğunluğu" value={social} tone="impact" />
            <Kpi label="Kapsama" value={year.idx >= 10 ? "Geniş" : year.idx >= 5 ? "Orta" : "Sınırlı"} tone="water" />
          </div>
        </aside>
      </div>
    </>
  );

  if (embedded) return <div id="simulasyon">{inner}</div>;

  return (
    <Section
      id="simulasyon"
      eyebrow="07 · Yıl Bazlı Simülasyon"
      title="Gazze'de aşamalı, disiplinli yayılım."
      intro="Zaman çizelgesi bir slider değil, sahnedir. Her yıl seçimi aktif varlıkları, finansman kaynağını ve etkiyi yeniden hesaplar."
    >
      {inner}
    </Section>
  );
}

function Kpi({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="bg-surface p-4">
      <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</div>
      <div
        className="font-display text-xl mt-2"
        style={{ color: `var(--color-${tone})` }}
      >
        {value}
      </div>
    </div>
  );
}
