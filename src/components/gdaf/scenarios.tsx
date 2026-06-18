import { useState } from "react";
import data from "@/data/gdaf";
import { Section, DataTag } from "./chrome";

type ScenarioKey = "base" | "stress" | "optimistic";

const SCENARIO_LABELS: Record<ScenarioKey, string> = {
  base: "Temel Senaryo",
  stress: "Stres Senaryosu",
  optimistic: "İyimser Senaryo",
};

export function ScenariosSection() {
  const [scn, setScn] = useState<ScenarioKey>("base");
  const sc = data.scenarios[scn];

  return (
    <Section
      id="senaryo"
      eyebrow="09 · Senaryolar"
      title="Üç farklı dünya, tek bir mimari."
      intro="Aynı finansal mimari farklı saha koşullarında nasıl davranır? Senaryolar arasında geçiş yapın."
    >
      <div className="flex flex-wrap gap-2 mb-8">
        {(Object.keys(SCENARIO_LABELS) as ScenarioKey[]).map((k) => {
          const active = scn === k;
          const tone =
            k === "base" ? "water" : k === "stress" ? "risk" : "impact";
          return (
            <button
              key={k}
              onClick={() => setScn(k)}
              className={`px-5 py-3 text-sm tracking-wide rounded-sm transition-all border ${
                active
                  ? "border-foreground text-foreground bg-surface-2"
                  : "border-rule text-muted-foreground hover:text-foreground"
              }`}
              style={active ? { borderColor: `var(--color-${tone})`, color: `var(--color-${tone})` } : undefined}
            >
              {SCENARIO_LABELS[k]}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="panel p-6 lg:col-span-2">
          <div className="eyebrow mb-2">{sc.name}</div>
          <div className="font-display text-3xl mb-6">
            {scn === "base" && (
              <>Olgun yıl geliri: <span className="text-water">11 mn $</span></>
            )}
            {scn === "stress" && (
              <>Gelir <span className="text-risk">7,5 mn $</span>'a düşer · yıllık <span className="text-risk">1,5 mn $</span> açık</>
            )}
            {scn === "optimistic" && (
              <>Ek sukuk, <span className="text-impact">yerel üretim</span>, sistemsel altyapı</>
            )}
          </div>

          <div className="space-y-2">
            <div className="eyebrow">Varsayımlar</div>
            {sc.assumptions.map((a: string) => (
              <div key={a} className="flex gap-3 text-sm text-foreground/90 leading-snug">
                <span className="text-water mt-2 w-1 h-1 rounded-full bg-current shrink-0" />
                {a}
              </div>
            ))}
          </div>

          {sc.mitigation && (
            <div className="mt-6 border-t border-rule pt-5 space-y-2">
              <div className="eyebrow text-risk">Azaltım mekanizması</div>
              {sc.mitigation.map((m: string) => (
                <div key={m} className="flex gap-3 text-sm text-foreground/90 leading-snug">
                  <span className="text-risk mt-2 w-1 h-1 rounded-full bg-current shrink-0" />
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          {scn === "stress" && (
            <div className="panel-2 p-5 border-l-2 border-l-risk">
              <div className="eyebrow text-risk mb-2">DSRA Dayanımı</div>
              <div className="font-display text-2xl leading-tight">
                15 mn $ rezerv ≈ <span className="text-risk">10 yıllık</span> açık tamponu
              </div>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                Yıllık 1,5 mn $ açığın DSRA tarafından sürdürülebilir biçimde karşılanması mümkündür.
              </p>
            </div>
          )}
          {scn === "base" && (
            <div className="panel-2 p-5 border-l-2 border-l-water">
              <div className="eyebrow text-water mb-2">Gelir Kompozisyonu</div>
              <div className="text-sm space-y-2 mt-3">
                <Row label="Mikro varlıklar" value="2 mn $" />
                <Row label="Üretim tesisi + cihazlar" value="4 mn $" />
                <Row label="Vakıf getirisi" value="5 mn $" />
                <div className="border-t border-rule pt-2 mt-2 flex justify-between">
                  <span>Toplam olgun gelir</span>
                  <span className="font-display text-water">11 mn $</span>
                </div>
              </div>
            </div>
          )}
          {scn === "optimistic" && (
            <div className="panel-2 p-5 border-l-2 border-l-impact">
              <div className="eyebrow text-impact mb-2">Olası Açılımlar</div>
              <ul className="text-sm space-y-2 mt-3 text-foreground/90">
                <li>Gazze yerel montaj hattı operasyonel</li>
                <li>Büyük WASH altyapısına geçiş penceresi açılır</li>
                <li>Daha geniş kapsama ve sosyal etki</li>
              </ul>
            </div>
          )}

          <div className="panel p-5">
            <div className="eyebrow mb-2">Görsel ton</div>
            <div className="text-sm text-foreground/90">{sc.visual_tone}</div>
          </div>
        </div>
      </div>

      {/* Before / After */}
      <div className="mt-16">
        <div className="flex justify-between items-baseline mb-6">
          <div>
            <div className="eyebrow mb-2">Önce / Sonra</div>
            <h3 className="font-display text-2xl">Mevcut kriz → GDAF ile aşamalı iyileşme</h3>
          </div>
          <DataTag kind="senaryo" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <BeforeAfter
            title="Mevcut durum"
            tone="risk"
            rows={[
              ["Kişi başı su", "6,1 L/gün"],
              ["WASH altyapısı işlevselliği", "%20"],
              ["Hastalık riski", "Yüksek"],
              ["Aktif WASH birimi (proje)", "—"],
              ["Ulaşılan kişi (proje)", "—"],
              ["Yerel kapasite", "Sınırlı"],
            ]}
          />
          <BeforeAfter
            title="GDAF · Yıl 10 hedef sahnesi"
            tone="impact"
            rows={[
              ["Kişi başı su (cihaz portföyü ile)", ">15 L/gün modüler katkı"],
              ["WASH altyapısı işlevselliği", "Modüler + bakım sürekliliği"],
              ["Hastalık riski", "Belirgin düşüş"],
              ["Aktif WASH birimi", "~60+"],
              ["Ulaşılan kişi", "~250.000+"],
              ["Yerel kapasite", "Bakım + teknik eğitim merkezi"],
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-foreground/90">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function BeforeAfter({
  title,
  tone,
  rows,
}: {
  title: string;
  tone: string;
  rows: [string, string][];
}) {
  return (
    <div className="panel p-6">
      <div className="font-display text-lg" style={{ color: `var(--color-${tone})` }}>
        {title}
      </div>
      <div className="mt-5 divide-y divide-rule">
        {rows.map(([l, v]) => (
          <div key={l} className="py-3 flex justify-between text-sm">
            <span className="text-muted-foreground">{l}</span>
            <span className="text-foreground">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
