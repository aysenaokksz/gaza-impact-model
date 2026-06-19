import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  KRIZ_HERO,
  KRIZ_WATER,
  KRIZ_POPULATION,
  KRIZ_HEALTH,
  KRIZ_INFRA,
  KRIZ_NEEDS,
  KRIZ_NEEDS_NOTE,
  KRIZ_NEEDS_COLORS,
} from "@/data/krizData";
import { DataTag } from "./chrome";

const H_WAVE =
  "M-200,24 q50,-6 100,0 t100,0 t100,0 t100,0 t100,0 V48 H-200 Z";

function pctOnScale(value: number, max: number) {
  return Math.min(100, Math.max(0, (value / max) * 100));
}

function KrizHeroCard() {
  return (
    <div className="dash-card p-4 md:p-5 h-full flex flex-col items-center justify-center text-center min-h-0">
      <div className="eyebrow text-[9px] mb-1.5">{KRIZ_HERO.eyebrow}</div>
      <h1 className="font-display text-base md:text-lg lg:text-xl leading-tight text-water max-w-md">
        {KRIZ_HERO.title}
      </h1>
      <p className="mt-2 text-[11px] md:text-xs text-muted-foreground leading-relaxed max-w-md line-clamp-3">
        {KRIZ_HERO.intro}
      </p>
    </div>
  );
}

function KrizWaterCard() {
  const { currentL, whoEmergencyL, prewarL, scaleMaxL } = KRIZ_WATER;
  const fillWidth = pctOnScale(currentL, scaleMaxL);
  const whoPos = pctOnScale(whoEmergencyL, scaleMaxL);
  const prewarPos = pctOnScale(prewarL, scaleMaxL);
  const currentPos = pctOnScale(currentL, scaleMaxL);

  return (
    <div className="dash-card p-4 h-full flex flex-col min-h-0">
      <div className="flex items-start justify-between gap-2 shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-widest text-risk">{KRIZ_WATER.label}</span>
        <DataTag kind="rapor" source={KRIZ_WATER.source} />
      </div>

      <p className="mt-2 text-[11px] text-foreground leading-snug shrink-0">
        {KRIZ_WATER.headline}{" "}
        <span className="text-risk font-bold">{KRIZ_WATER.headlineHighlight}</span>
      </p>

      <div className="grid grid-cols-3 gap-2 mt-2 shrink-0">
        {KRIZ_WATER.markers.map((m) => (
          <div key={m.key} className="text-center">
            <div className="text-[8px] uppercase tracking-wide text-muted-foreground leading-tight">{m.label}</div>
            <div className={`font-display text-sm md:text-base leading-none mt-1 ${m.tone === "risk" ? "text-risk" : "text-ink"}`}>
              {m.value}
            </div>
            <div className="text-[8px] text-muted-foreground mt-0.5">{m.unit}</div>
          </div>
        ))}
      </div>

      <div className="relative mt-3 flex-1 flex flex-col justify-end min-h-[56px]">
        <div className="relative h-10 md:h-11 rounded-md bg-[#E1F5EE]/50 border border-rule overflow-visible">
          <div className="absolute inset-y-0 left-0 overflow-hidden rounded-l-md" style={{ width: `${fillWidth}%` }}>
            <svg className="absolute inset-0 w-[200%] h-full min-w-full" viewBox="0 0 400 48" preserveAspectRatio="none" aria-hidden>
              <g className="home-wave-h-back">
                <path d={H_WAVE} fill="#5DCAA5" fillOpacity={0.7} />
              </g>
              <g className="home-wave-h-front">
                <path d={H_WAVE} fill="#1D9E75" fillOpacity={0.9} />
              </g>
            </svg>
          </div>
          <div className="home-marker-line bg-water" style={{ left: `${currentPos}%` }} />
          <div className="home-marker-dot bg-water" style={{ left: `${currentPos}%` }} />
          <div className="home-marker-line bg-risk" style={{ left: `${whoPos}%` }} />
          <div className="home-marker-dot bg-risk" style={{ left: `${whoPos}%` }} />
          <div className="home-marker-line bg-[#888780]" style={{ left: `${prewarPos}%` }} />
          <div className="home-marker-dot bg-[#888780]" style={{ left: `${prewarPos}%` }} />
        </div>
        <div className="relative mt-1.5 h-4 text-[9px] text-muted-foreground">
          <span className="absolute left-0 top-0">0</span>
          <span className="absolute top-0 font-semibold text-water" style={{ left: `${currentPos}%`, transform: "translateX(-50%)" }}>6,1</span>
          <span className="absolute top-0 font-semibold text-risk" style={{ left: `${whoPos}%`, transform: "translateX(-50%)" }}>15</span>
          <span className="absolute right-0 top-0">100 L/kişi/gün</span>
        </div>
      </div>
      <p className="text-[9px] text-muted-foreground mt-1 leading-tight shrink-0">{KRIZ_WATER.note}</p>
    </div>
  );
}

function PopulationStrip() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 shrink-0">
      {KRIZ_POPULATION.map((item) => (
        <div key={item.label} className="dash-card px-3 py-2.5 text-center">
          <div className="text-[9px] text-muted-foreground leading-tight">{item.label}</div>
          <div className="font-display text-base md:text-lg text-risk leading-none mt-1">{item.value}</div>
        </div>
      ))}
    </div>
  );
}

function HealthGrid() {
  return (
    <div className="dash-card p-3 md:p-4 h-full flex flex-col min-h-0">
      <div className="flex items-start justify-between gap-2 shrink-0 mb-2">
        <h2 className="font-display text-xs md:text-sm text-ink">Sağlık yükü</h2>
        <DataTag kind="rapor" source="OCHA/WASH R3" />
      </div>
      <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-3 gap-2">
        {KRIZ_HEALTH.map((item) => (
          <div key={item.label} className="rounded-lg border border-rule bg-surface-2 px-2.5 py-2 flex flex-col justify-center min-h-0">
            <div className="text-[9px] text-muted-foreground leading-tight line-clamp-2">{item.label}</div>
            <div className="font-display text-sm md:text-base text-risk leading-none mt-1">
              {item.value} <span className="text-[10px] font-normal text-muted-foreground">{item.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfraPanel() {
  return (
    <div className="dash-card p-3 md:p-4 h-full flex flex-col min-h-0">
      <div className="flex items-start justify-between gap-2 shrink-0 mb-2">
        <h2 className="font-display text-xs md:text-sm text-ink">Altyapı hasarı & yeniden inşa</h2>
        <DataTag kind="rapor" source="RDNA 2026" />
      </div>
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-2">
        {KRIZ_INFRA.map((item) => (
          <div key={item.label} className="rounded-lg border border-rule bg-surface-2 px-2.5 py-2 flex flex-col justify-center">
            <div className="text-[9px] text-muted-foreground leading-tight">{item.label}</div>
            <div
              className={`font-display text-sm md:text-base leading-none mt-1 ${
                item.tone === "risk" ? "text-risk" : item.tone === "finance" ? "text-[var(--finance-ink)]" : "text-ink"
              }`}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NeedsChart() {
  return (
    <div className="dash-card p-3 md:p-4 h-full flex flex-col min-h-0">
      <div className="eyebrow text-[9px] mb-1 shrink-0">Öncelikli ihtiyaç dağılımı</div>
      <div className="flex-1 min-h-0 flex items-center gap-2">
        <div className="flex-1 min-h-0 h-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={KRIZ_NEEDS} innerRadius="48%" outerRadius="78%" dataKey="value" stroke="var(--color-card)" strokeWidth={2}>
                {KRIZ_NEEDS.map((_, i) => (
                  <Cell key={i} fill={KRIZ_NEEDS_COLORS[i % KRIZ_NEEDS_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-rule)", fontSize: 11 }}
                formatter={(v: number) => [`%${v}`, "Pay"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="shrink-0 space-y-1 text-[9px]">
          {KRIZ_NEEDS.map((n, i) => (
            <li key={n.name} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: KRIZ_NEEDS_COLORS[i] }} />
              <span className="text-muted-foreground">{n.name}</span>
              <span className="font-semibold text-ink">%{n.value}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-[9px] text-muted-foreground mt-1 leading-tight shrink-0">{KRIZ_NEEDS_NOTE}</p>
    </div>
  );
}

export function KrizDashboard() {
  return (
    <div className="h-full min-h-0 grid grid-rows-[minmax(0,1fr)_auto_minmax(0,0.95fr)_minmax(0,1fr)] gap-2 overflow-hidden">
      <section className="min-h-0 grid lg:grid-cols-2 gap-2">
        <KrizHeroCard />
        <KrizWaterCard />
      </section>

      <PopulationStrip />

      <section className="min-h-0">
        <HealthGrid />
      </section>

      <section className="min-h-0 grid lg:grid-cols-2 gap-2">
        <InfraPanel />
        <NeedsChart />
      </section>
    </div>
  );
}
