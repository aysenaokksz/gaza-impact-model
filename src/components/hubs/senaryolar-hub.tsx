import { useState } from "react";
import {
  gdaf,
  SENARYO_SECTIONS,
  SCENARIO_COMPARISON,
  BASE_SCENARIO_YEARS,
  STRESS_SCENARIO_YEARS,
  OPTIMISTIC_MILESTONES,
} from "@/data/site-data";
import { HubLayout, HubSection } from "@/components/gdaf/hub-layout";
import { YearSimulationSection } from "@/components/gdaf/year-simulation";
import { ResponsiveContainer, ComposedChart, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

type ScenarioKey = "base" | "stress" | "optimistic";

const LABELS: Record<ScenarioKey, string> = { base: "Temel Senaryo", stress: "Olumsuz (Stres)", optimistic: "İyimser Senaryo" };

export function SenaryolarHub() {
  const [scn, setScn] = useState<ScenarioKey>("base");
  const sc = gdaf.scenarios[scn];

  return (
    <HubLayout
      eyebrow="Hub 04 · Senaryo Simülasyonu"
      title="Üç farklı dünya, tek mimari."
      intro="Aynı finansal mimari farklı saha koşullarında nasıl davranır? Senaryolar arasında geçiş yapın."
      sections={SENARYO_SECTIONS}
    >
      <div className="flex flex-wrap gap-2 -mt-8 mb-4">
        {(Object.keys(LABELS) as ScenarioKey[]).map((k) => (
          <button
            key={k}
            onClick={() => setScn(k)}
            className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
              scn === k ? "border-water text-water bg-water/5" : "border-rule text-muted-foreground"
            }`}
          >
            {LABELS[k]}
          </button>
        ))}
      </div>

      <HubSection id="temel" title="Temel Senaryo (10 yıl)" tag={{ kind: "senaryo" }}>
        <div className="panel p-6 mb-4">
          <div className="font-display text-2xl mb-4">Olgun yıl geliri: <span className="text-water">11 mn $</span></div>
          <ul className="space-y-2 text-sm">
            {gdaf.scenarios.base.assumptions.map((a: string) => (
              <li key={a} className="flex gap-2"><span className="text-water">·</span>{a}</li>
            ))}
          </ul>
        </div>
        <div className="h-64">
          <ResponsiveContainer>
            <ComposedChart data={BASE_SCENARIO_YEARS}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-rule)" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-rule)" }} />
              <Legend />
              <Bar dataKey="micro" name="Mikro" stackId="a" fill="var(--color-water)" />
              <Bar dataKey="production" name="Üretim+Cihaz" stackId="a" fill="var(--color-impact)" />
              <Bar dataKey="waqf" name="Vakıf" stackId="a" fill="var(--color-finance)" />
              <Line type="monotone" dataKey="net" name="Net nakit" stroke="var(--color-risk)" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </HubSection>

      <HubSection id="stres" title="Olumsuz (Stres) Senaryo" tag={{ kind: "senaryo" }}>
        <div className="panel p-6 mb-4 border-l-2 border-l-risk">
          <p className="text-sm text-muted-foreground mb-3">
            Kritik bulgu: Sistemi en çok zorlayan şey büyük foncunun çekilmesi değil, <strong className="text-foreground">vakıf sermayesinin korunup korunmadığıdır</strong>.
          </p>
          <ul className="space-y-2 text-sm">
            {gdaf.scenarios.stress.assumptions.map((a: string) => (
              <li key={a} className="flex gap-2"><span className="text-risk">·</span>{a}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-risk font-medium">15 mn $ DSRA ≈ 10 yıllık açık tamponu</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={STRESS_SCENARIO_YEARS}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-rule)" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-rule)" }} />
              <Legend />
              <Line type="monotone" dataKey="revenue" name="Gelir" stroke="var(--color-water)" strokeWidth={2} />
              <Line type="monotone" dataKey="expense" name="Gider" stroke="var(--color-risk)" strokeWidth={2} />
              <Line type="monotone" dataKey="dsra" name="DSRA" stroke="var(--color-finance)" strokeWidth={2} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </HubSection>

      <HubSection id="iyimser" title="İyimser Senaryo" tag={{ kind: "senaryo" }}>
        <div className="panel p-6 mb-4">
          <ul className="space-y-2 text-sm mb-4">
            {gdaf.scenarios.optimistic.assumptions.map((a: string) => (
              <li key={a} className="flex gap-2"><span className="text-impact">·</span>{a}</li>
            ))}
          </ul>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-b border-rule text-left">
                <th className="py-2">Yıl</th><th className="py-2">Gelir</th><th className="py-2">Küm. Sukuk</th><th className="py-2">Faz</th><th className="py-2">Karbon</th>
              </tr>
            </thead>
            <tbody>
              {OPTIMISTIC_MILESTONES.map((r) => (
                <tr key={r.year} className="border-b border-rule/50">
                  <td className="py-2">{r.year}</td>
                  <td className="py-2 text-water">{r.revenue} mn $</td>
                  <td className="py-2">{r.sukuk} mn $</td>
                  <td className="py-2 text-muted-foreground">{r.phase}</td>
                  <td className="py-2">{r.carbon} mn $</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </HubSection>

      <HubSection id="simulasyon" title="Yıl Bazlı Simülasyon">
        <YearSimulationSection embedded />
      </HubSection>

      <HubSection id="karsilastirma" title="Senaryo Karşılaştırması" tag={{ kind: "senaryo" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-b border-rule text-left">
                <th className="py-2 pr-4">Senaryo</th>
                <th className="py-2 pr-4">Olgun Gelir</th>
                <th className="py-2 pr-4">Olgun Gider</th>
                <th className="py-2">Sonuç</th>
              </tr>
            </thead>
            <tbody>
              {SCENARIO_COMPARISON.map((r) => (
                <tr key={r.scenario} className="border-b border-rule/50">
                  <td className="py-3 pr-4 font-medium">{r.scenario}</td>
                  <td className="py-3 pr-4 text-water">{r.revenue}</td>
                  <td className="py-3 pr-4">{r.expense}</td>
                  <td className="py-3 text-muted-foreground">{r.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 panel-2 p-4 text-sm">
          <span className="text-muted-foreground">Aktif senaryo özeti — </span>
          <span className="text-foreground">{sc.name}</span>
        </div>
      </HubSection>
    </HubLayout>
  );
}
