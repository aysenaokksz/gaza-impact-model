import data from "@/data/gdaf";
import { Section, DataTag } from "./chrome";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const POOL_COLORS: Record<string, string> = {
  "Vakıf sermayesi": "var(--color-impact)",
  "Sosyal etkili sukuk": "var(--color-water)",
  "Kitle fonlaması": "var(--color-water-soft)",
  "Hibe / teberru": "var(--color-finance)",
  "Karz-ı hasen": "var(--color-risk)",
};

export function ModelSection() {
  const layers = [
    {
      title: "Vakıf",
      sub: "Misyon ve yönetim",
      body: "Sosyal misyonu korur, yönetim ilkelerini belirler. Ana para dokunulmazdır.",
      tone: "impact",
    },
    {
      title: "SPV / Fon kuruluşu",
      sub: "Operasyonel motor",
      body: "Kaynakları toplar, sukuk ihraç eder, varlıkları yönetir, gelirleri dağıtır.",
      tone: "water",
    },
    {
      title: "Ayrı havuzlar",
      sub: "Sermaye disiplini",
      body: "Vakıf · Sukuk · Müşareke · Hibe + Karz-ı Hasen. Fonlar karışmaz.",
      tone: "finance",
    },
    {
      title: "Varlıklar",
      sub: "Cihaz ve tesis",
      body: "Mobil RO, konteyner RO, güneş pompa-depo, üretim/tedarik tesisi, bakım merkezi.",
      tone: "water",
    },
    {
      title: "Hizmetler",
      sub: "Sahaya çıkış",
      body: "Temiz su, sanitasyon, bakım, teknik eğitim, sosyal hizmet.",
      tone: "impact",
    },
    {
      title: "Etki",
      sub: "Ölçülebilir sonuç",
      body: "Ulaşılan kişi, günlük temiz su kapasitesi, yerel istihdam, kapsama alanı.",
      tone: "impact",
    },
  ];

  return (
    <Section
      id="model"
      eyebrow="03 · GDAF Modeli"
      title="Vakıftan etkiye doğru, disiplinli bir zincir."
      intro="Para, varlıklar üretir; varlıklar hizmet, hizmet ölçülebilir etki üretir. Her halka kendi yönetim ve denetim kuralı ile çalışır."
    >
      <div className="grid lg:grid-cols-6 md:grid-cols-3 gap-px bg-rule rounded-sm overflow-hidden">
        {layers.map((l, i) => (
          <div key={l.title} className="bg-surface p-6 flex flex-col relative">
            <div className="text-[10px] text-muted-foreground tracking-widest mb-3">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div
              className={`font-display text-lg leading-tight ${
                l.tone === "impact"
                  ? "text-impact"
                  : l.tone === "water"
                  ? "text-water"
                  : "text-finance"
              }`}
            >
              {l.title}
            </div>
            <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1">
              {l.sub}
            </div>
            <p className="text-xs text-muted-foreground/90 mt-4 leading-relaxed">
              {l.body}
            </p>
            {i < layers.length - 1 && (
              <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-water/40">
                →
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        <div className="panel p-6">
          <div className="eyebrow mb-2">Vakıf</div>
          <div className="font-display text-lg">Sosyal misyonu korur</div>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Anapara dokunulmazdır. Yıllık getiri işletme, rezerv ve sosyal hizmete yönlendirilir.
          </p>
        </div>
        <div className="panel p-6">
          <div className="eyebrow mb-2">SPV</div>
          <div className="font-display text-lg">Kaynakları yönetir</div>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Sukuk ihraç eder, müşareke ortaklıklarını organize eder, gelirleri ilgili havuzlara dağıtır.
          </p>
        </div>
        <div className="panel p-6">
          <div className="eyebrow mb-2">Denetim</div>
          <div className="font-display text-lg">Çok katmanlı gözetim</div>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Şer'î kurul, bağımsız dış denetim ve çok taraflı raporlama mekanizması.
          </p>
        </div>
      </div>
    </Section>
  );
}

export function FinancialArchitectureSection() {
  const fa = data.financial_architecture;
  const sourceData = fa.source_allocation.map((s: any) => ({
    name: s.source,
    value: s.share_pct,
    amount: s.amount_label,
    nature: s.nature,
  }));
  const useData = fa.use_of_funds.map((u: any) => ({
    name: u.use,
    value: u.share_pct,
    amount: `${(u.amount_usd / 1_000_000).toFixed(0)} mn $`,
    note: u.note,
  }));
  const waterfall = fa.cash_flow_waterfall_mature_year;

  return (
    <Section
      id="mimari"
      eyebrow="04 · Finansal Mimari"
      title="200 milyon dolarlık temel yapı."
      intro="Toplam kaynak beş ayrı katmandan oluşur. Her katmanın hukuki niteliği, gelir hakkı ve kullanım disiplini farklıdır."
    >
      <div className="grid lg:grid-cols-2 gap-6 mb-10">
        {/* Source */}
        <div className="panel p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="eyebrow">Kaynak dağılımı</div>
              <div className="font-display text-xl mt-1">
                <span className="text-finance">200 mn $</span> toplam kaynak
              </div>
            </div>
            <DataTag kind="senaryo" />
          </div>
          <div className="h-60">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={sourceData}
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={1}
                  dataKey="value"
                  stroke="var(--color-background)"
                  strokeWidth={2}
                >
                  {sourceData.map((s: any, i: number) => (
                    <Cell key={i} fill={POOL_COLORS[s.name] || "var(--color-water)"} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--color-surface-2)",
                    border: "1px solid var(--color-rule)",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {sourceData.map((s: any) => (
              <div
                key={s.name}
                className="flex items-baseline gap-3 text-xs border-t border-rule pt-2"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: POOL_COLORS[s.name] }}
                />
                <span className="text-foreground min-w-[140px]">{s.name}</span>
                <span className="text-muted-foreground flex-1 leading-snug">{s.nature}</span>
                <span className="font-display text-base text-foreground">{s.amount}</span>
                <span className="text-muted-foreground w-10 text-right">%{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Use */}
        <div className="panel p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="eyebrow">Kullanım dağılımı</div>
              <div className="font-display text-xl mt-1">Nereye gider?</div>
            </div>
            <DataTag kind="senaryo" />
          </div>
          <div className="h-60">
            <ResponsiveContainer>
              <BarChart data={useData} layout="vertical" margin={{ left: 10, right: 30 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                  width={170}
                />
                <Bar dataKey="value" radius={[0, 2, 2, 0]}>
                  {useData.map((_: any, i: number) => (
                    <Cell key={i} fill={i === 0 ? "var(--color-impact)" : "var(--color-water)"} />
                  ))}
                </Bar>
                <Tooltip
                  contentStyle={{
                    background: "var(--color-surface-2)",
                    border: "1px solid var(--color-rule)",
                    fontSize: 12,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-1.5">
            {useData.map((u: any) => (
              <div key={u.name} className="flex items-baseline gap-3 text-xs">
                <span className="text-foreground min-w-[170px]">{u.name}</span>
                <span className="text-muted-foreground flex-1 leading-snug">{u.note}</span>
                <span className="font-display text-foreground">{u.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Waterfall */}
      <div className="panel p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="eyebrow">Nakit akışı şelalesi · olgun yıl</div>
            <div className="font-display text-xl mt-1">Gelir → kullanım sırası</div>
          </div>
          <DataTag kind="senaryo" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-px bg-rule rounded-sm overflow-hidden">
          {waterfall.map((w: any, i: number) => (
            <div key={w.order} className="bg-surface p-4 flex flex-col relative">
              <div className="text-[10px] text-muted-foreground tracking-widest mb-2">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="text-xs font-medium leading-snug">{w.item}</div>
              <div className="font-display text-lg mt-3 text-finance">{w.amount}</div>
              <div className="text-[10px] text-muted-foreground mt-2 leading-snug">
                {w.note}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-[11px] text-muted-foreground">
          Sıra önemlidir: önce sistemin çalışması, sonra rezervler, sonra geri ödemeler, sonra yatırımcı dağıtımı, sonra sosyal hizmet ve yeni yatırımlar.
        </div>
      </div>
    </Section>
  );
}

export function SeparatePoolsSection() {
  const pools = data.financial_architecture.separate_pools;
  const warnings = [
    "Müşareke geliri sukuk yatırımcısına aktarılamaz.",
    "Hibe / sosyal hizmet fonu yatırımcı ödemelerinde kullanılamaz.",
    "Vakıf ana parası korunur; yalnızca getirisi kullanılır.",
    "Sukuk birincil kaynak değildir.",
  ];

  return (
    <Section
      id="havuzlar"
      eyebrow="05 · Havuz Bütünlüğü"
      title="Ayrı havuzların bütünlüğü."
      intro="Her havuzun kaynağı, varlığı ve gelir hakkı ayrıdır. Karışım yoktur. Bu disiplin hem fıkhî dayanağın hem yatırımcı güveninin temelidir."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-rule rounded-sm overflow-hidden mb-8">
        {pools.map((p: any, i: number) => {
          const color = ["water", "water-soft", "impact", "finance"][i];
          return (
            <div key={p.pool} className="bg-surface p-6 flex flex-col">
              <div
                className="h-1 w-10 mb-4"
                style={{ background: `var(--color-${color})` }}
              />
              <div className="font-display text-lg" style={{ color: `var(--color-${color})` }}>
                {p.pool}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{p.amount}</div>
              <div className="mt-4 text-xs text-foreground/90 leading-snug">
                <span className="text-muted-foreground">Varlık · </span>
                {p.asset}
              </div>
              <div className="mt-3 text-xs text-muted-foreground leading-snug">
                {p.revenue_right}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {warnings.map((w) => (
          <div
            key={w}
            className="flex items-start gap-3 p-4 panel-2 border-l-2 border-l-risk"
          >
            <div className="text-risk text-lg leading-none mt-0.5">!</div>
            <div className="text-sm leading-snug">{w}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function MoneyChainSection() {
  const cols = [
    {
      title: "Kaynaklar",
      items: ["Vakıf", "Sosyal etkili sukuk", "Hibe", "Karz-ı Hasen", "Müşareke kitle fonlaması"],
      color: "finance",
    },
    {
      title: "Finansman havuzları",
      items: ["Vakıf havuzu", "Sukuk havuzu", "Müşareke havuzu", "Hibe + Karz sosyal katmanı"],
      color: "water",
    },
    {
      title: "Varlıklar",
      items: [
        "Mobil RO üniteleri",
        "Güneş pompa/depo setleri",
        "Konteyner RO sistemleri",
        "Türkiye üretim/tedarik tesisi",
        "Gazze bakım ve eğitim merkezi",
        "Gazze yerel montaj hattı",
        "Büyük WASH altyapı tesisi",
      ],
      color: "water-soft",
    },
    {
      title: "Hizmetler",
      items: ["Temiz su", "Sanitasyon", "Bakım / teknik destek", "Teknik eğitim", "Sosyal hizmet"],
      color: "impact",
    },
    {
      title: "Etki",
      items: [
        "Ulaşılan kişi sayısı",
        "Günlük temiz su kapasitesi",
        "Kırılgan gruplar",
        "Yerel istihdam",
        "Kapsama genişlemesi",
      ],
      color: "impact",
    },
  ];

  return (
    <Section
      id="zincir"
      eyebrow="06 · Paradan Etkiye Zinciri"
      title="Kaynak → Havuz → Varlık → Hizmet → Etki."
      intro="Her halkada kaynak, varlık ve hak ayrıdır; ama hepsi tek bir sosyal sonucu üretmek üzere kurgulanmıştır."
    >
      <div className="grid lg:grid-cols-5 gap-px bg-rule rounded-sm overflow-hidden">
        {cols.map((c, i) => (
          <div key={c.title} className="bg-surface p-5 relative">
            <div className="text-[10px] text-muted-foreground tracking-widest mb-3">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div
              className="font-display text-base mb-4"
              style={{ color: `var(--color-${c.color})` }}
            >
              {c.title}
            </div>
            <ul className="space-y-2">
              {c.items.map((it) => (
                <li
                  key={it}
                  className="text-xs text-foreground/90 border-l border-rule pl-3 py-1 leading-snug hover:border-l-water transition-colors"
                >
                  {it}
                </li>
              ))}
            </ul>
            {i < cols.length - 1 && (
              <div className="hidden lg:block absolute right-0 top-8 translate-x-1/2 text-water/30 text-lg">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
