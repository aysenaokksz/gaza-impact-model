import {
  MODEL_SECTIONS,
  WHY_FAILS_CARDS,
  LITERATURE,
  FINANCIAL_INSTRUMENTS,
  FIKHI_POINTS,
  LEGAL_LAYERS,
} from "@/data/site-data";
import { HubLayout, HubSection } from "@/components/gdaf/hub-layout";

const LAYERS = [
  { title: "Vakıf", sub: "Misyon ve yönetim", body: "Sosyal misyonu korur. Ana para dokunulmazdır.", tone: "text-impact" },
  { title: "SPV / Fon kuruluşu", sub: "Operasyonel motor", body: "Kaynakları toplar, sukuk ihraç eder, varlıkları yönetir.", tone: "text-water" },
  { title: "Ayrı havuzlar", sub: "Sermaye disiplini", body: "Vakıf · Sukuk · Müşareke · Hibe + Karz-ı Hasen.", tone: "text-finance" },
  { title: "Varlıklar", sub: "Cihaz ve tesis", body: "Mobil RO, konteyner RO, güneş pompa-depo, üretim tesisi.", tone: "text-water" },
  { title: "Hizmetler", sub: "Sahaya çıkış", body: "Temiz su, sanitasyon, bakım, teknik eğitim.", tone: "text-impact" },
  { title: "Etki", sub: "Ölçülebilir sonuç", body: "Ulaşılan kişi, su kapasitesi, yerel istihdam.", tone: "text-impact" },
];

const CHAIN = [
  { title: "Kaynaklar", items: ["Vakıf", "Sosyal etkili sukuk", "Hibe", "Karz-ı Hasen", "Müşareke"], color: "finance" },
  { title: "Havuzlar", items: ["Vakıf havuzu", "Sukuk havuzu", "Müşareke havuzu", "Hibe + Karz sosyal katmanı"], color: "water" },
  { title: "Varlıklar", items: ["Mobil RO", "Konteyner RO", "Güneş setleri", "Üretim tesisi", "Bakım merkezi"], color: "water-soft" },
  { title: "Hizmetler", items: ["Temiz su", "Sanitasyon", "Bakım", "Teknik eğitim", "Sosyal hizmet"], color: "impact" },
  { title: "Etki", items: ["Ulaşılan kişi", "Su kapasitesi", "İstihdam", "Kapsama"], color: "impact" },
];

export function ModelHub() {
  return (
    <HubLayout
      eyebrow="Hub 02 · GDAF Modeli"
      title="Vakıftan etkiye disiplinli bir zincir."
      intro="Para, varlıklar üretir; varlıklar hizmet, hizmet ölçülebilir etki üretir. Her halka kendi yönetim ve denetim kuralı ile çalışır."
      sections={MODEL_SECTIONS}
    >
      <HubSection id="neden-yeni" title="Neden Yeni Model?" intro="Hiçbir tek araç bu krizi çözmüyor.">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-rule rounded-sm overflow-hidden mb-6">
          {WHY_FAILS_CARDS.map((c, i) => (
            <div key={c.title} className="bg-surface p-5">
              <div className="text-[10px] text-muted-foreground mb-2">0{i + 1}</div>
              <div className="font-display text-lg mb-3">{c.title}</div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {c.points.map((p) => (
                  <li key={p} className="flex gap-2"><span className="text-risk">·</span>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="panel-2 p-6 border-l-2 border-l-water">
          <p className="font-display text-xl">
            GDAF yalnızca fon toplama değil; varlık + işletme + risk tamponu + sosyal etkiyi birlikte kurgulayan bir <span className="text-water">finansman mimarisidir.</span>
          </p>
        </div>
      </HubSection>

      <HubSection id="kavramsal" title="Kavramsal Temel (Literatür)" tag={{ kind: "rapor" }}>
        <div className="flex flex-wrap gap-2">
          {LITERATURE.map((l) => (
            <span key={l} className="px-3 py-2 text-xs rounded-lg border border-rule bg-surface-2">{l}</span>
          ))}
        </div>
      </HubSection>

      <HubSection id="kurumsal" title="Kurumsal Yapı" tag={{ kind: "senaryo" }}>
        <div className="grid lg:grid-cols-6 gap-px bg-rule rounded-sm overflow-hidden mb-6">
          {LAYERS.map((l, i) => (
            <div key={l.title} className="bg-surface p-5">
              <div className="text-[10px] text-muted-foreground mb-2">{String(i + 1).padStart(2, "0")}</div>
              <div className={`font-display text-base ${l.tone}`}>{l.title}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{l.sub}</div>
              <p className="text-xs text-muted-foreground mt-3">{l.body}</p>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="panel p-5">
            <div className="eyebrow mb-2">Katman 1 — Vakıf</div>
            <p className="text-sm text-muted-foreground">Gazze Faizsiz Dirençli Altyapı Vakfı: sosyal misyon, yönetim ilkeleri. Finansman toplamaz.</p>
          </div>
          <div className="panel p-5">
            <div className="eyebrow mb-2">Katman 2 — SPV</div>
            <p className="text-sm text-muted-foreground">Vakfın tek sahibi olduğu özel amaçlı kuruluş; sukuk ihracı, varlık sahipliği, nakit yönetimi.</p>
          </div>
        </div>
      </HubSection>

      <HubSection id="araclar" title="Finansal Araçlar (6 araç)" tag={{ kind: "senaryo" }}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {FINANCIAL_INSTRUMENTS.map((a) => (
            <div key={a.name} className="dash-card p-5">
              <div className="font-display text-water text-base">{a.name}</div>
              <p className="text-sm text-muted-foreground mt-2">{a.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground border-l-2 border-finance/50 pl-3">
          Sosyal etkili sukuk ≠ ticari sukuk. Anapara/getiri taahhüdü yoktur; getiri piyasanın altında.
        </p>
      </HubSection>

      <HubSection id="zincir" title="Paradan Etkiye Zinciri">
        <div className="grid lg:grid-cols-5 gap-px bg-rule rounded-sm overflow-hidden">
          {CHAIN.map((c) => (
            <div key={c.title} className="bg-surface p-4">
              <div className="font-display text-sm mb-3" style={{ color: `var(--color-${c.color})` }}>{c.title}</div>
              <ul className="space-y-1">
                {c.items.map((it) => (
                  <li key={it} className="text-xs text-muted-foreground border-l border-rule pl-2 py-0.5">{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </HubSection>

      <HubSection id="fikhi" title="Fıkhî Uygunluk" tag={{ kind: "rapor", source: "AAOIFI/IFSB" }}>
        <div className="space-y-3">
          {FIKHI_POINTS.map((p) => (
            <div key={p} className="panel-2 p-4 border-l-2 border-l-water text-sm">{p}</div>
          ))}
        </div>
      </HubSection>

      <HubSection id="hukuki" title="Hukuki & Kurumsal Çerçeve">
        <div className="grid md:grid-cols-3 gap-4">
          {LEGAL_LAYERS.map((l) => (
            <div key={l.title} className="panel p-5">
              <div className="font-display text-base text-water mb-3">{l.title}</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {l.items.map((it) => <li key={it}>· {it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </HubSection>
    </HubLayout>
  );
}
