import { gdaf, DEGERLENDIRME_SECTIONS, COMPARISON_ROWS, POLICY_RECOMMENDATIONS } from "@/data/site-data";
import { HubLayout, HubSection } from "@/components/gdaf/hub-layout";

const MODELS = ["GDAF", "Tek Sukuk", "Salt Hibe", "Mikrofinans", "Geleneksel PPP"] as const;
const COL_KEYS = ["gdaf", "sukuk_only", "grant_only", "micro", "ppp"] as const;

export function DegerlendirmeHub() {
  return (
    <HubLayout
      eyebrow="Hub 06 · Karşılaştırma & Sonuç"
      title="Modelin farkı, riskleri ve politika önerileri."
      intro="GDAF'ın benzer modellerle karşılaştırması, risk matrisi ve uygulanabilir politika önerileri."
      sections={DEGERLENDIRME_SECTIONS}
    >
      <HubSection id="karsilastirma" title="Karşılaştırmalı Değerlendirme" tag={{ kind: "rapor" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-rule text-left">
                <th className="py-3 pr-4 text-muted-foreground eyebrow">Özellik</th>
                {MODELS.map((m) => (
                  <th key={m} className="py-3 px-2 text-center text-xs font-medium">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="border-b border-rule/50">
                  <td className="py-3 pr-4 text-foreground">{row.feature}</td>
                  {COL_KEYS.map((k) => (
                    <td key={k} className="py-3 px-2 text-center text-lg">
                      {row[k] ? <span className="text-impact">✓</span> : <span className="text-muted-foreground/40">✗</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-3">
          {[
            "Kaynak sıralaması: bağış/vakıf/karz-ı hasen önce, sukuk sonra",
            "Vakıf anaparası dokunulmaz",
            "Modüler varlık → erken hizmet",
            "Net çıkış stratejisi + yerel sahiplik",
            "Fon değil, sosyal altyapı platformu",
          ].map((p) => (
            <div key={p} className="panel-2 p-4 text-sm border-l-2 border-l-impact">{p}</div>
          ))}
        </div>
      </HubSection>

      <HubSection id="risk" title="Risk Matrisi" tag={{ kind: "senaryo", source: "Tablo 6.8.11" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-b border-rule text-left">
                <th className="py-2 pr-4">Risk</th>
                <th className="py-2 pr-4">Olasılık/Etki</th>
                <th className="py-2 pr-4">Sonuç</th>
                <th className="py-2">Azaltım</th>
              </tr>
            </thead>
            <tbody>
              {gdaf.risk_matrix.map((r: { risk: string; probability_impact: string; effect: string; mitigation: string }) => (
                <tr key={r.risk} className="border-b border-rule/50">
                  <td className="py-3 pr-4 font-medium">{r.risk}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-0.5 text-xs rounded ${r.probability_impact === "Yüksek" ? "bg-risk/15 text-risk" : "bg-finance/15 text-finance"}`}>
                      {r.probability_impact}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{r.effect}</td>
                  <td className="py-3 text-muted-foreground">{r.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </HubSection>

      <HubSection id="sonuc" title="Sonuç & Politika Önerileri">
        <div className="panel p-6 mb-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            GDAF, Gazze'nin WASH altyapısını yeniden kurmak için katılım finansı temelli, vakıf çekirdekli ve modüler bir model sunar.
            Sukuk tamamlayıcıdır; asıl güvence dokunulmaz vakıf anaparası ve ayrı havuz disiplinidir.
          </p>
        </div>
        <div className="space-y-3">
          {POLICY_RECOMMENDATIONS.map((p, i) => (
            <div key={p} className="dash-card p-5 flex gap-4">
              <div className="text-water font-display text-lg">{String(i + 1).padStart(2, "0")}</div>
              <p className="text-sm text-foreground/90 leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </HubSection>
    </HubLayout>
  );
}
