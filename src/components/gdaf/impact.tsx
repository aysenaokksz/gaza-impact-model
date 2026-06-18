import { useState } from "react";
import data from "@/data/gdaf";
import { Section, DataTag } from "./chrome";

export function ImpactSection() {
  const kpis = [
    { label: "Ulaşılan kişi (olgun)", value: "250K+", tone: "water", sub: "tahmini, modüler cihaz portföyü" },
    { label: "Aktif WASH birimi", value: "60+", tone: "water", sub: "konteyner + mobil + büyük" },
    { label: "Günlük temiz su", value: "1.500 m³+", tone: "water", sub: "cihaz havuzu kapasitesi" },
    { label: "Yerel istihdam", value: "100+", tone: "impact", sub: "teknisyen + bakım + üretim" },
    { label: "Kırılgan grup hizmeti", value: "60K+", tone: "impact", sub: "gebe / emziren kadın · çocuk" },
    { label: "Bakım kapasitesi", value: "Yerleşik", tone: "impact", sub: "Yıl 10 sonrası" },
    { label: "Fon kullanım verimliliği", value: "%≈97", tone: "finance", sub: "yönetim/raporlama %3" },
    { label: "İdari gider oranı", value: "%≈3", tone: "finance", sub: "vekâlet ücreti" },
    { label: "Sosyal hizmet bütçesi", value: "1,65 mn $ / yıl", tone: "finance", sub: "olgun yıl korunmuş" },
    { label: "DSRA dayanımı", value: "≈10 yıl", tone: "risk", sub: "stres senaryosunda" },
  ];

  return (
    <Section
      id="etki"
      eyebrow="10 · Etki Analizi"
      title="Para harcanmıyor, çalışıyor."
      intro="Etki, yıl bazlı yayılım ile birlikte büyür. Aşağıdaki göstergeler olgun yıl temsili senaryosunu yansıtır."
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-rule rounded-sm overflow-hidden">
        {kpis.map((k) => (
          <div key={k.label} className="bg-surface p-5 flex flex-col">
            <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground leading-tight">
              {k.label}
            </div>
            <div
              className="font-display text-3xl mt-3"
              style={{ color: `var(--color-${k.tone})` }}
            >
              {k.value}
            </div>
            <div className="text-[10px] text-muted-foreground mt-2 leading-snug">
              {k.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Compliance Matrix */}
      <div className="mt-16">
        <div className="flex justify-between items-baseline mb-6">
          <div>
            <div className="eyebrow mb-2">Yönerge uyum matrisi</div>
            <h3 className="font-display text-2xl">GDAF bu yönergeyi nasıl karşılıyor?</h3>
          </div>
          <DataTag />
        </div>

        <div className="panel overflow-hidden">
          <div className="grid grid-cols-[1fr_2fr] divide-y divide-rule">
            <div className="contents">
              <div className="bg-surface-2 p-3 eyebrow">Gereksinim</div>
              <div className="bg-surface-2 p-3 eyebrow">GDAF'ın karşılığı</div>
            </div>
            {data.guideline_compliance.map((r: any, i: number) => (
              <div key={i} className="contents">
                <div className="bg-surface p-4 border-t border-rule text-sm text-foreground/90">
                  {r.requirement}
                </div>
                <div className="bg-surface p-4 border-t border-rule text-sm text-muted-foreground">
                  {r.site_answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

const TABS = [
  { key: "varsayim", label: "Varsayımlar" },
  { key: "senaryo", label: "Senaryo Verileri" },
  { key: "risk", label: "Risk Matrisi" },
  { key: "kpi", label: "KPI Tanımları" },
  { key: "kural", label: "Havuz Kuralları" },
  { key: "ai", label: "Yapay Zekâ Notu" },
];

export function TechnicalAppendixSection() {
  const [tab, setTab] = useState("varsayim");

  return (
    <Section
      id="ek"
      eyebrow="11 · Teknik Ek"
      title="Şeffaflık katmanı."
      intro="Modelin arkasındaki varsayımlar, kurallar ve metodolojik notlar."
    >
      <div className="flex flex-wrap gap-1 mb-6 border-b border-rule">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-3 text-sm tracking-wide transition-colors border-b-2 -mb-px ${
              tab === t.key
                ? "border-water text-water"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="panel p-6 min-h-[300px]">
        {tab === "varsayim" && (
          <div className="space-y-3 text-sm text-foreground/90 leading-relaxed">
            <p>
              <span className="text-water">Toplam kaynak:</span> 200 mn $ (Faz 1 varsayımsal büyüklük).
            </p>
            <p>
              <span className="text-water">Vakıf getirisi:</span> Yıllık ~%5 (anapara korunur).
            </p>
            <p>
              <span className="text-water">Üretim tesisi:</span> 3. yıldan itibaren gelir üretir; ~%8 getiri.
            </p>
            <p>
              <span className="text-water">Mikro varlıklar:</span> 1. yıldan gelir; ~%10 getiri.
            </p>
            <p>
              <span className="text-water">Karz-ı hasen:</span> 6 yılda kapanır, yıllık 2 mn $ ödeme.
            </p>
            <p>
              <span className="text-water">DSRA:</span> 15 mn $; stres yılında yıllık 1,5 mn $ açığı ~10 yıl karşılayabilir.
            </p>
          </div>
        )}

        {tab === "senaryo" && (
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {(["base", "stress", "optimistic"] as const).map((s) => {
              const sc = data.scenarios[s];
              return (
                <div key={s} className="panel-2 p-4">
                  <div className="eyebrow mb-2">{sc.name}</div>
                  <ul className="space-y-2 text-foreground/90">
                    {sc.assumptions.map((a: string) => (
                      <li key={a} className="flex gap-2 leading-snug text-xs">
                        <span className="text-water">·</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        {tab === "risk" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left">
                <tr className="text-muted-foreground border-b border-rule">
                  <th className="py-3 pr-4 font-normal eyebrow">Risk</th>
                  <th className="py-3 pr-4 font-normal eyebrow">Olasılık / Etki</th>
                  <th className="py-3 pr-4 font-normal eyebrow">Sonuç</th>
                  <th className="py-3 font-normal eyebrow">Azaltım</th>
                </tr>
              </thead>
              <tbody>
                {data.risk_matrix.map((r: any) => (
                  <tr key={r.risk} className="border-b border-rule/50">
                    <td className="py-3 pr-4 text-foreground">{r.risk}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-sm ${
                          r.probability_impact === "Yüksek"
                            ? "bg-risk/15 text-risk"
                            : "bg-finance/15 text-finance"
                        }`}
                      >
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
        )}

        {tab === "kpi" && (
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            {[
              ["Ulaşılan kişi", "Aktif cihaz portföyü tarafından doğrudan hizmet verilen tahmini birey sayısı."],
              ["Aktif WASH birimi", "Hizmet veren tüm modüler, konteyner ve büyük WASH varlıklarının toplam sayısı."],
              ["Günlük temiz su kapasitesi", "Cihaz portföyünün teorik günlük üretim/dağıtım kapasitesi (m³)."],
              ["Fon kullanım verimliliği", "(Toplam kaynak − idari/yönetim gideri) / toplam kaynak."],
              ["DSRA dayanımı", "Mevcut DSRA bakiyesinin yıllık beklenen açığa bölünmesi (yıl)."],
              ["İdari gider oranı", "Vekâlet ücreti dahil yönetim giderinin toplam yıllık gelire oranı."],
            ].map(([k, d]) => (
              <div key={k} className="panel-2 p-4">
                <div className="font-display text-base text-water">{k}</div>
                <div className="text-xs text-muted-foreground mt-2 leading-relaxed">{d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "kural" && (
          <div className="space-y-3 text-sm">
            {[
              "Sukuk havuzu yalnızca sukuk varlıklarının gelirini sukuk yatırımcısına dağıtır.",
              "Müşareke havuzu geliri yalnızca kitle fonlaması yatırımcılarına aittir; sukuk havuzuna aktarılamaz.",
              "Vakıf anaparası dokunulmazdır; yalnızca yıllık getirisi işletme, rezerv ve sosyal hizmete yönlendirilir.",
              "Hibe ve karz-ı hasen sosyal katmanı yatırımcı ödemeleri için kullanılamaz.",
              "Tekafül havuzu sadece operasyonel riskler içindir; savaş/abluka kapsam dışıdır.",
              "DSRA likidite kesintilerine karşı tampondur; planlı yatırımlar için kullanılmaz.",
            ].map((r, i) => (
              <div key={i} className="flex gap-3 panel-2 p-4 border-l-2 border-l-water">
                <div className="text-water font-display text-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-foreground/90 leading-snug">{r}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "ai" && (
          <div className="max-w-3xl">
            <div className="eyebrow mb-3">Yapay Zekâ Kullanım Notu</div>
            <p className="text-foreground/90 leading-relaxed">
              Yapay zekâ araçları; görsel tasarım, yapılandırma, metin düzenleme ve
              interaktif prototip hazırlığı süreçlerinde destekleyici araç olarak
              kullanılmıştır. Nihai içerik, varsayımlar, kaynak seçimi ve akademik
              sorumluluk proje ekibine aittir.
            </p>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Tüm sayısal göstergeler ya rapor verisi (kaynak belirtilmiş) ya da temsili
              senaryo varsayımı olarak etiketlenmiştir. Bu prototip canlı bir operasyonel
              sistemin değil; finansal mimarinin sunum amaçlı görselleştirmesidir.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}
