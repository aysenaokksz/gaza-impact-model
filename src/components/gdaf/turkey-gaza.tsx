import { useEffect, useState } from "react";
import data from "@/data/gdaf";
import { Section, DataTag } from "./chrome";

// Simple globe-like view: orthographic projection of a regional context
// centered between Turkey and Gaza, with subtle rotation.
const W = 640;
const H = 480;
const CX = W / 2;
const CY = H / 2;
const R = 200;

// Convert lon/lat to orthographic projection given center lon
function ortho(lon: number, lat: number, centerLon: number) {
  const φ = (lat * Math.PI) / 180;
  const λ = ((lon - centerLon) * Math.PI) / 180;
  const cosc = Math.cos(φ) * Math.cos(λ);
  if (cosc < 0) return null; // behind globe
  const x = R * Math.cos(φ) * Math.sin(λ);
  const y = -R * Math.sin(φ);
  return { x: CX + x, y: CY + y };
}

// Hand-traced ultra-simplified land outlines for Turkey & Levant region
// Each path is a sequence of [lon, lat]. Kept minimal for elegance.
const REGIONS: Array<{ name: string; path: number[][] }> = [
  // Turkey (very rough)
  {
    name: "Türkiye",
    path: [
      [26, 41.5], [28, 42], [31, 42], [34, 42], [37, 41.5], [40, 41.2],
      [43, 41], [44, 39], [42, 37], [40, 37.5], [37, 37], [34, 36.5],
      [31, 36.5], [29, 36.5], [27, 37], [26, 38], [26, 40], [26, 41.5],
    ],
  },
  // Levant / Mediterranean coast strip (Lebanon-Israel-Palestine-Sinai)
  {
    name: "Levant",
    path: [
      [35.0, 35.5], [35.6, 34.5], [35.1, 33.0], [34.8, 32.0], [34.5, 31.4],
      [34.2, 31.2], [33.6, 31.0], [33.0, 30.6], [33.5, 29.5], [34.5, 29.0],
      [34.9, 29.5], [34.9, 30.5], [35.3, 31.4], [35.6, 32.5], [36.3, 33.5],
      [36.5, 34.5], [36.0, 35.5], [35.0, 35.5],
    ],
  },
  // Cyprus
  {
    name: "Cyprus",
    path: [
      [32.3, 35.0], [33.6, 35.4], [34.6, 35.4], [34.2, 34.7], [32.8, 34.6], [32.3, 35.0],
    ],
  },
];

const TURKEY = { lon: 28.97, lat: 41.01, name: "Türkiye · Üretim/Tedarik" };
const GAZA = { lon: 34.43, lat: 31.42, name: "Gazze" };

export function TurkeyGazaSection() {
  const [rot, setRot] = useState(33);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const elapsed = (t - start) / 1000;
      setRot(33 + Math.sin(elapsed * 0.3) * 4);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const turkey = ortho(TURKEY.lon, TURKEY.lat, rot)!;
  const gaza = ortho(GAZA.lon, GAZA.lat, rot)!;

  // Bezier path
  const mx = (turkey.x + gaza.x) / 2;
  const my = (turkey.y + gaza.y) / 2 - 80;
  const routePath = `M ${turkey.x} ${turkey.y} Q ${mx} ${my} ${gaza.x} ${gaza.y}`;

  const benefits = [
    { t: "Düşük birim maliyet", d: "Ölçek ekonomisi ve standart üretim" },
    { t: "Ölçeklenebilir üretim", d: "Cihaz havuzu büyüdükçe maliyet düşer" },
    { t: "Sukuk bağlı gelir", d: "Tesis ve cihazlar gelir varlığı olarak çalışır" },
    { t: "Hızlı saha dağıtımı", d: "Modüler cihazlar lojistik zinciriyle ilerler" },
    { t: "Geniş coğrafi erişim", d: "Bölgesel tedarik ağı şehirlere yayılır" },
  ];

  return (
    <Section
      id="lojistik"
      eyebrow="08 · Türkiye–Gazze Üretim & Lojistik"
      title="Sukuk varlığı bir ülke içinde, gelir başka bir coğrafyada."
      intro="Sukuk I aşamasında üretim/tedarik kapasitesi Türkiye'de, kullanım Gazze'de kurgulanır. Bu, sukukun gelir üretirken aynı anda saha dağıtım hızını yükseltmesini sağlar."
    >
      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="panel p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="eyebrow">Bölgesel görünüm · Sukuk I</div>
              <div className="font-display text-xl mt-1">Üretim → Lojistik → Saha</div>
            </div>
            <DataTag kind="senaryo" />
          </div>

          <div className="relative">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
              <defs>
                <radialGradient id="globeFill" cx="0.35" cy="0.35" r="0.7">
                  <stop offset="0" stopColor="rgba(120,170,210,0.12)" />
                  <stop offset="0.7" stopColor="rgba(80,120,160,0.06)" />
                  <stop offset="1" stopColor="rgba(20,40,60,0.0)" />
                </radialGradient>
                <radialGradient id="globeHi" cx="0.3" cy="0.25" r="0.5">
                  <stop offset="0" stopColor="rgba(255,255,255,0.06)" />
                  <stop offset="1" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
              </defs>

              {/* Globe */}
              <circle cx={CX} cy={CY} r={R} fill="url(#globeFill)" stroke="rgba(180,200,215,0.35)" strokeWidth="1" />
              <circle cx={CX} cy={CY} r={R} fill="url(#globeHi)" />

              {/* Graticule (meridians + parallels) */}
              {[-60, -30, 0, 30, 60].map((latLine) => {
                const pts: string[] = [];
                for (let lon = -90; lon <= 90; lon += 5) {
                  const p = ortho(lon, latLine, rot);
                  if (p) pts.push(`${p.x},${p.y}`);
                }
                return (
                  <polyline
                    key={`p${latLine}`}
                    points={pts.join(" ")}
                    fill="none"
                    stroke="rgba(180,200,215,0.10)"
                    strokeWidth="0.6"
                  />
                );
              })}
              {[-60, -30, 0, 30, 60, 90, 120, 150, 180].map((lonLine) => {
                const pts: string[] = [];
                for (let lat = -85; lat <= 85; lat += 5) {
                  const p = ortho(lonLine, lat, rot);
                  if (p) pts.push(`${p.x},${p.y}`);
                }
                return (
                  <polyline
                    key={`m${lonLine}`}
                    points={pts.join(" ")}
                    fill="none"
                    stroke="rgba(180,200,215,0.08)"
                    strokeWidth="0.6"
                  />
                );
              })}

              {/* Land outlines */}
              {REGIONS.map((r) => {
                const pts = r.path
                  .map(([lon, lat]) => ortho(lon, lat, rot))
                  .filter(Boolean) as { x: number; y: number }[];
                if (pts.length < 3) return null;
                const d = pts
                  .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
                  .join(" ") + " Z";
                return (
                  <path
                    key={r.name}
                    d={d}
                    fill="rgba(180,200,215,0.10)"
                    stroke="rgba(200,215,225,0.4)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Route */}
              <path
                d={routePath}
                fill="none"
                stroke="var(--color-finance)"
                strokeWidth="1.4"
                strokeDasharray="5 5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="20"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Endpoint: Turkey */}
              <g>
                <circle cx={turkey.x} cy={turkey.y} r={10} fill="none" stroke="var(--color-water)" strokeOpacity="0.4" />
                <circle cx={turkey.x} cy={turkey.y} r={5} fill="var(--color-water)" />
                <text x={turkey.x + 12} y={turkey.y - 8} fontSize="12" fill="var(--color-water)" fontFamily="Inter">
                  Türkiye
                </text>
                <text x={turkey.x + 12} y={turkey.y + 6} fontSize="10" fill="rgba(200,210,220,0.7)" fontFamily="Inter">
                  Üretim / Tedarik
                </text>
              </g>

              {/* Endpoint: Gaza */}
              <g>
                <circle cx={gaza.x} cy={gaza.y} r={10} fill="none" stroke="var(--color-impact)" strokeOpacity="0.4" />
                <circle cx={gaza.x} cy={gaza.y} r={5} fill="var(--color-impact)" />
                <text x={gaza.x + 12} y={gaza.y - 8} fontSize="12" fill="var(--color-impact)" fontFamily="Inter">
                  Gazze
                </text>
                <text x={gaza.x + 12} y={gaza.y + 6} fontSize="10" fill="rgba(200,210,220,0.7)" fontFamily="Inter">
                  Saha kullanımı
                </text>
              </g>
            </svg>
          </div>

          <div className="mt-3 text-[10px] text-muted-foreground/70 leading-relaxed">
            Lojistik güzergâh temsilîdir; fiili rota saha, izin ve güvenlik koşullarına bağlıdır.
          </div>
        </div>

        <aside className="space-y-3">
          <div className="panel p-5">
            <div className="eyebrow mb-2">Mantık</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sukuk I, Gazze'de büyük merkezi bir tesis yerine Türkiye'de bir üretim/tedarik
              kapasitesini ve modüler cihaz havuzunu finanse eder. Cihazlar saha koşullarına
              göre kademeli olarak Gazze'ye aktarılır.
            </p>
          </div>
          {benefits.map((b, i) => (
            <div key={b.t} className="panel-2 p-4">
              <div className="text-[10px] text-muted-foreground tracking-widest mb-1">
                0{i + 1}
              </div>
              <div className="font-display text-base text-foreground">{b.t}</div>
              <div className="text-xs text-muted-foreground mt-1.5 leading-snug">{b.d}</div>
            </div>
          ))}
        </aside>
      </div>

      {/* Sukuk Roadmap */}
      <div className="mt-16">
        <div className="flex justify-between items-baseline mb-6">
          <div>
            <div className="eyebrow mb-2">Sukuk yol haritası</div>
            <h3 className="font-display text-2xl">Aşamalı, sınırlı, birincil değil.</h3>
          </div>
          <DataTag kind="senaryo" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-rule rounded-sm overflow-hidden">
          {data.sukuk_roadmap.map((s: any, i: number) => (
            <div key={s.phase} className="bg-surface p-5 flex flex-col">
              <div className="text-[10px] text-muted-foreground tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-display text-lg text-water mt-1">{s.phase}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.period}</div>
              <div className="mt-4 text-sm text-foreground/90 leading-snug">
                {s.target_asset}
              </div>
              <div className="mt-3 text-xs text-muted-foreground leading-relaxed">
                {s.purpose}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-muted-foreground border-l-2 border-water/50 pl-4 leading-relaxed">
          Sukuk sistemin tek veya birincil kaynağı değildir; kaynak hiyerarşisinde sınırlı
          ve aşamalı bir rol oynar.
        </div>
      </div>
    </Section>
  );
}
