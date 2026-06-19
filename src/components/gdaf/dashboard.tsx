import { useState } from "react";
import {
  Droplet,
  Droplets,
  Activity,
  ShieldCheck,
  Building2,
  HeartPulse,
  Users,
  UserMinus,
  Construction,
  Coins,
  Sun,
  TrendingUp,
  ArrowRight,
  UsersRound,
} from "lucide-react";
import {
  HOME_HERO,
  HOME_WATER,
  HOME_CRISIS_STRIP,
  HOME_FUND,
  HOME_MODEL_CHAIN,
  HOME_IMPACT,
} from "@/data/homeData";

const BADGE_ICONS = { droplet: Droplet, activity: Activity, "shield-check": ShieldCheck } as const;

const CRISIS_ICONS = {
  users: Users,
  "user-minus": UserMinus,
  droplet: Droplets,
  construction: Construction,
} as const;

const CHAIN_ICONS = {
  users: Users,
  coins: Coins,
  sun: Sun,
  droplets: Droplets,
  "trending-up": TrendingUp,
} as const;

const IMPACT_ICONS = {
  users: Users,
  building: Building2,
  "heart-pulse": HeartPulse,
  "users-round": UsersRound,
} as const;

const H_WAVE =
  "M-200,24 q50,-6 100,0 t100,0 t100,0 t100,0 t100,0 V48 H-200 Z";

function pctOnScale(value: number, max: number) {
  return Math.min(100, Math.max(0, (value / max) * 100));
}

function HomeDataTag({ kind, source }: { kind: "rapor" | "senaryo"; source?: string }) {
  const isRapor = kind === "rapor";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 rounded-full border shrink-0 ${
        isRapor ? "home-data-tag-rapor" : "home-data-tag-senaryo"
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {isRapor ? "Rapor verisi" : "Temsili senaryo"}
      {source && <span className="normal-case tracking-normal opacity-80">· {source}</span>}
    </span>
  );
}

function HeroCard() {
  return (
    <div className="dash-card p-4 md:p-5 lg:p-6 h-full flex flex-col items-center justify-center text-center min-h-0">
      <h1 className="font-display text-lg md:text-xl lg:text-2xl leading-tight text-water max-w-lg">
        {HOME_HERO.title}
      </h1>
      <p className="mt-3 text-xs md:text-sm text-muted-foreground leading-relaxed max-w-lg line-clamp-3">
        {HOME_HERO.subtitle}
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {HOME_HERO.badges.map((badge) => {
          const Icon = BADGE_ICONS[badge.icon];
          return (
            <span
              key={badge.id}
              className="home-pill-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium"
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              {badge.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function WaterCrisisCard() {
  const { currentL, whoEmergencyL, prewarL, scaleMaxL } = HOME_WATER;
  const fillWidth = pctOnScale(currentL, scaleMaxL);
  const whoPos = pctOnScale(whoEmergencyL, scaleMaxL);
  const prewarPos = pctOnScale(prewarL, scaleMaxL);
  const currentPos = pctOnScale(currentL, scaleMaxL);

  return (
    <div className="dash-card p-4 h-full flex flex-col min-h-0">
      <div className="flex items-start justify-between gap-2 shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-widest text-risk">{HOME_WATER.label}</span>
        <HomeDataTag kind="rapor" source={HOME_WATER.source} />
      </div>

      <p className="mt-2 text-[11px] text-foreground leading-snug shrink-0">
        {HOME_WATER.headline}{" "}
        <span className="text-risk font-bold">{HOME_WATER.headlineHighlight}</span>
      </p>

      <div className="grid grid-cols-3 gap-2 mt-3 shrink-0">
        {HOME_WATER.markers.map((m) => (
          <div key={m.key} className="text-center">
            <div className="text-[8px] uppercase tracking-wide text-muted-foreground leading-tight">{m.label}</div>
            <div className={`font-display text-base md:text-lg leading-none mt-1 ${m.tone === "risk" ? "text-risk" : "text-ink"}`}>
              {m.value}
            </div>
            <div className="text-[8px] text-muted-foreground mt-0.5">{m.unit}</div>
          </div>
        ))}
      </div>

      <div className="relative mt-4 mb-1 flex-1 flex flex-col justify-end min-h-[64px]">
        <div className="relative h-11 md:h-12 rounded-md bg-[#E1F5EE]/50 border border-rule overflow-visible">
          <div
            className="absolute inset-y-0 left-0 overflow-hidden rounded-l-md"
            style={{ width: `${fillWidth}%` }}
          >
            <svg
              className="absolute inset-0 w-[200%] h-full min-w-full"
              viewBox="0 0 400 48"
              preserveAspectRatio="none"
              aria-hidden
            >
              <g className="home-wave-h-back">
                <path d={H_WAVE} fill="#5DCAA5" fillOpacity={0.7} />
              </g>
              <g className="home-wave-h-front">
                <path d={H_WAVE} fill="#1D9E75" fillOpacity={0.9} />
              </g>
            </svg>
          </div>

          {/* Su doluluk bitimi — 6,1 */}
          <div className="home-marker-line bg-water" style={{ left: `${currentPos}%` }} />
          <div className="home-marker-dot bg-water" style={{ left: `${currentPos}%` }} />
          {/* WHO acil eşiği — 15 */}
          <div className="home-marker-line bg-risk" style={{ left: `${whoPos}%` }} />
          <div className="home-marker-dot bg-risk" style={{ left: `${whoPos}%` }} />
          {/* Savaş öncesi — 82,7 */}
          <div className="home-marker-line bg-[#888780]" style={{ left: `${prewarPos}%` }} />
          <div className="home-marker-dot bg-[#888780]" style={{ left: `${prewarPos}%` }} />
        </div>
        <div className="relative mt-2 h-4 text-[9px] text-muted-foreground">
          <span className="absolute left-0 top-0">0</span>
          <span className="absolute top-0 font-semibold text-water" style={{ left: `${currentPos}%`, transform: "translateX(-50%)" }}>
            6,1
          </span>
          <span className="absolute top-0 font-semibold text-risk" style={{ left: `${whoPos}%`, transform: "translateX(-50%)" }}>
            15
          </span>
          <span className="absolute right-0 top-0">100 L/kişi/gün</span>
        </div>
      </div>
    </div>
  );
}

function FundPanel() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const r = 42;
  const cx = 54;
  const cy = 54;
  const c = 2 * Math.PI * r;
  let offset = 0;

  const selected = selectedIdx !== null ? HOME_FUND.layers[selectedIdx] : null;
  const [amountValue, amountUnit] = selected ? selected.amount.split(" ") : [HOME_FUND.total, HOME_FUND.unit];

  return (
    <div className="dash-card p-3 md:p-4 h-full flex flex-col min-h-0">
      <div className="flex items-start justify-between gap-2 shrink-0 mb-2">
        <h2 className="font-display text-xs md:text-sm text-ink leading-tight">{HOME_FUND.title}</h2>
        <HomeDataTag kind="senaryo" />
      </div>

      <div className="flex-1 min-h-0 flex gap-3 items-center" onClick={() => setSelectedIdx(null)}>
        <div className="shrink-0 flex flex-col items-center">
          <div onClick={(e) => e.stopPropagation()}>
            <svg viewBox="0 0 108 108" className="w-[120px] h-[120px] md:w-[148px] md:h-[148px]" role="img" aria-label="Fon kompozisyonu grafiği">
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-rule)" strokeWidth="13" opacity={0.25} />
            {HOME_FUND.layers.map((layer, i) => {
              const len = (layer.sharePct / 100) * c;
              const dasharray = `${len} ${c - len}`;
              const dashoffset = -offset;
              offset += len;
              const isSelected = selectedIdx === i;
              const isDimmed = selectedIdx !== null && !isSelected;
              return (
                <circle
                  key={layer.id}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={layer.color}
                  strokeWidth={isSelected ? 15 : 13}
                  strokeDasharray={dasharray}
                  strokeDashoffset={dashoffset}
                  strokeOpacity={isDimmed ? 0.28 : 1}
                  transform={`rotate(-90 ${cx} ${cy})`}
                  className="cursor-pointer transition-all duration-200"
                  style={{ filter: isSelected ? "saturate(1.2)" : undefined }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIdx(i);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${layer.name}, ${layer.amount}, yüzde ${layer.sharePct}`}
                  aria-pressed={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedIdx(i);
                    }
                  }}
                />
              );
            })}
            <text x={cx} y={cy - 4} textAnchor="middle" className="fill-ink text-[17px] font-bold pointer-events-none" style={{ fontFamily: "Inter, sans-serif" }}>
              {amountValue}
            </text>
            <text x={cx} y={cy + 11} textAnchor="middle" className="fill-muted-foreground text-[8px] pointer-events-none" style={{ fontFamily: "Inter, sans-serif" }}>
              {amountUnit}
            </text>
            {selectedIdx !== null && (
              <text x={cx} y={cy + 22} textAnchor="middle" className="fill-water text-[8px] font-semibold pointer-events-none" style={{ fontFamily: "Inter, sans-serif" }}>
                %{selected!.sharePct}
              </text>
            )}
            </svg>
          </div>
          <p className="text-[9px] text-muted-foreground text-center leading-tight max-w-[148px] mt-1">{HOME_FUND.note}</p>
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center min-h-0">
          {selected ? (
            <div
              className="rounded-lg border border-rule bg-surface-2 p-3 transition-colors duration-200"
              style={{ borderColor: `${selected.color}33` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: selected.color }} />
                <h3 className="font-semibold text-[11px] md:text-xs text-ink leading-tight">{selected.name}</h3>
              </div>
              <p className="font-display text-base md:text-lg text-ink leading-none">
                {selected.amount}
                <span className="text-muted-foreground text-sm font-normal ml-1.5">· %{selected.sharePct}</span>
              </p>
              <p className="mt-2 text-[10px] text-muted-foreground leading-relaxed">{selected.description}</p>
            </div>
          ) : (
            <div className="rounded-lg border border-rule bg-surface-2 p-3">
              <h3 className="font-semibold text-[11px] md:text-xs text-ink leading-tight">{HOME_FUND.centerLabel}</h3>
              <p className="font-display text-base md:text-lg text-ink leading-none mt-2">
                {HOME_FUND.total} {HOME_FUND.unit}
              </p>
              <p className="mt-2 text-[10px] text-muted-foreground leading-relaxed">
                Beş kaynak kanalından oluşan temsili Faz 1 finansman yapısı. Dilime tıklayarak detayları görüntüleyin.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ModelChainPanel() {
  return (
    <div className="dash-card p-3 md:p-4 h-full flex flex-col min-h-0">
      <h2 className="font-display text-xs md:text-sm text-ink shrink-0 mb-2">Model mantığı</h2>

      <div className="flex-1 min-h-0 flex items-center gap-0.5 md:gap-1">
        {HOME_MODEL_CHAIN.map((step, i) => {
          const Icon = CHAIN_ICONS[step.icon];
          return (
            <div key={step.id} className="flex items-center flex-1 min-w-0">
              <div className="flex-1 flex flex-col items-center text-center min-w-0 px-0.5">
                <div className="home-chain-node mb-1.5">
                  <Icon className="w-5 h-5 md:w-[1.35rem] md:h-[1.35rem] text-water" strokeWidth={1.75} />
                </div>
                <div className="font-semibold text-[9px] md:text-[10px] text-ink leading-tight">{step.title}</div>
                <div className="text-[7px] md:text-[8px] text-muted-foreground mt-0.5 leading-tight line-clamp-2">
                  {step.detail}
                </div>
              </div>
              {i < HOME_MODEL_CHAIN.length - 1 && (
                <ArrowRight className="w-4 h-4 md:w-[1.125rem] md:h-[1.125rem] text-water/30 shrink-0" strokeWidth={1.5} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CrisisStrip() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 shrink-0">
      {HOME_CRISIS_STRIP.map((item) => {
        const Icon = CRISIS_ICONS[item.icon];
        return (
          <div key={item.label} className="dash-card px-3 py-2.5 flex items-center gap-2.5 min-h-0">
            <div className="w-8 h-8 rounded-lg bg-risk/8 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-risk" strokeWidth={1.75} />
            </div>
            <p className="text-[10px] md:text-[11px] leading-snug min-w-0">
              <span className={`font-display font-bold text-sm md:text-base ${item.tone === "risk" ? "text-risk" : "text-[var(--finance-ink)]"}`}>
                {item.value}{" "}
              </span>
              <span className="text-muted-foreground">{item.label}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}

function ImpactRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 min-h-0 flex-1 h-full">
      {HOME_IMPACT.items.map((item) => {
        const Icon = IMPACT_ICONS[item.icon];
        return (
          <div key={item.id} className="dash-card p-4 md:p-5 h-full flex items-center justify-center min-h-0">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg bg-[#E1F5EE] flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-6 h-6 md:w-7 md:h-7 text-water" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 text-left">
                <div className="font-display font-bold text-water text-lg md:text-xl lg:text-2xl leading-none">
                  {item.prefix}
                  {item.value}
                </div>
                <p className="mt-1.5 text-sm md:text-base text-foreground leading-snug">{item.text}</p>
                {item.sub && <p className="text-xs md:text-sm text-muted-foreground mt-1 leading-tight">{item.sub}</p>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="h-full min-h-0 grid grid-rows-[minmax(0,1.15fr)_auto_minmax(0,1fr)_minmax(0,0.9fr)] gap-2 overflow-hidden">
      {/* 1) Hero + Su krizi */}
      <section className="min-h-0 grid lg:grid-cols-2 gap-2">
        <HeroCard />
        <WaterCrisisCard />
      </section>

      {/* 2) Kriz ölçeği */}
      <CrisisStrip />

      {/* 3) Model bir bakışta + Model mantığı */}
      <section className="min-h-0 grid lg:grid-cols-2 gap-2">
        <FundPanel />
        <ModelChainPanel />
      </section>

      {/* 4) Etki vurguları */}
      <section className="min-h-0 flex flex-col h-full">
        <ImpactRow />
      </section>
    </div>
  );
}
