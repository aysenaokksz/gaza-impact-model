import { useState } from "react";
import {
  TEKNIK_SECTIONS,
  ASSUMPTIONS,
  POOL_RULES,
  REFERENCES,
  KPI_DEFINITIONS,
  gdaf,
} from "@/data/site-data";
import { HubLayout } from "@/components/gdaf/hub-layout";

export function TeknikHub() {
  const [tab, setTab] = useState("varsayim");

  return (
    <HubLayout
      eyebrow="Hub 07 · Teknik Ek & Şeffaflık"
      title="Şeffaflık katmanı."
      intro="Modelin arkasındaki varsayımlar, kurallar ve metodolojik notlar."
      sections={TEKNIK_SECTIONS}
    >
      <div className="flex flex-wrap gap-1 -mt-8 mb-4 border-b border-rule">
        {TEKNIK_SECTIONS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-3 text-sm border-b-2 -mb-px transition-colors ${
              tab === t.id ? "border-water text-water" : "border-transparent text-muted-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="panel p-6 min-h-[280px]">
        {tab === "varsayim" && (
          <div className="space-y-3 text-sm">
            {ASSUMPTIONS.map((a) => (
              <p key={a.label}><span className="text-water font-medium">{a.label}:</span> {a.value}</p>
            ))}
          </div>
        )}

        {tab === "kaynaklar" && (
          <div className="space-y-4 text-sm">
            <div className="panel-2 p-4 border-l-2 border-l-water">
              <strong>Rapor verisi:</strong> OCHA, WHO, WASH R3, RDNA 2026, Dünya Bankası, PCBS, UNICEF vb.
            </div>
            <div className="panel-2 p-4 border-l-2 border-l-finance">
              <strong>Temsili senaryo:</strong> Finansal projeksiyonlar, yıl simülasyonu, olgun yıl gelir/gider tahminleri.
            </div>
            <p className="text-muted-foreground">{gdaf.project.prototype_note}</p>
          </div>
        )}

        {tab === "kpi" && (
          <div className="grid md:grid-cols-2 gap-4">
            {KPI_DEFINITIONS.map(([k, d]) => (
              <div key={k} className="panel-2 p-4">
                <div className="font-display text-water">{k}</div>
                <p className="text-xs text-muted-foreground mt-2">{d}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "kurallar" && (
          <div className="space-y-3">
            {POOL_RULES.map((r, i) => (
              <div key={i} className="panel-2 p-4 border-l-2 border-l-water text-sm flex gap-3">
                <span className="text-water font-display">{String(i + 1).padStart(2, "0")}</span>
                {r}
              </div>
            ))}
          </div>
        )}

        {tab === "kaynakca" && (
          <div className="flex flex-wrap gap-2">
            {REFERENCES.map((r) => (
              <span key={r} className="px-3 py-2 text-xs rounded-lg border border-rule bg-surface-2">{r}</span>
            ))}
          </div>
        )}

        {tab === "ai" && (
          <div className="max-w-2xl text-sm space-y-4">
            <p className="leading-relaxed">
              Yapay zekâ araçları; görsel tasarım, yapılandırma, metin düzenleme ve interaktif prototip hazırlığı süreçlerinde destekleyici araç olarak kullanılmıştır.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Tüm sayısal göstergeler ya rapor verisi (kaynak belirtilmiş) ya da temsili senaryo varsayımı olarak etiketlenmiştir.
            </p>
          </div>
        )}
      </div>
    </HubLayout>
  );
}
