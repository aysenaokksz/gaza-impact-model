import data from "@/data/gdaf";
import { Section, DataTag } from "./chrome";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  PieChart,
  Pie,
  Tooltip,
} from "recharts";

export function CrisisSection() {
  const wa = data.water_access;
  const dmg = data.infrastructure_damage;

  const gaugeMax = 100;
  const current = wa.median_daily_water_per_person.value;
  const emergency = wa.who_emergency_minimum.value;
  const longTerm = wa.who_long_term_standard.value;
  const prewar = wa.prewar_daily_water_per_person.value;

  const needs = data.priority_needs_distribution_pct
    .slice(0, 6)
    .map((n: any) => ({ name: n.need, value: n.all_gaza }));

  const barriers = data.water_access.water_access_barriers.map((b: any) => ({
    name: b.barrier,
    value: b.value,
  }));

  const popCards = [
    { label: "Toplam nüfus", value: "2,13M", source: "PCBS" },
    { label: "Yerinden edilmiş", value: "1,9M", source: "OCHA" },
    { label: "0–18 yaş çocuk", value: "1,09M", source: "PCBS" },
    { label: "Risk altındaki gebe/emziren kadın", value: "60K", source: "UNICEF" },
  ];

  const healthCards = [
    { label: "Akut sulu ishal", value: "500K+", sub: "vaka", source: "OCHA" },
    { label: "Hepatit A", value: "40K", sub: "vaka", source: "OCHA/UNRWA" },
    { label: "Su kaynaklı hastalık payı", value: "%25", source: "RAND" },
    { label: "Açık defekasyon", value: "%21,3", source: "WASH R3" },
    { label: "Çevresel tehdit altında hane", value: "%84,5", source: "WASH R3" },
  ];

  const dmgCards = [
    { label: "Hasarlı/yıkılmış WASH altyapısı", value: "%80", source: "MSF/Oxfam" },
    { label: "İşlevsiz su kuyusu", value: "%66", source: "UNOSAT" },
    { label: "Hasarlı ana WASH tesisi", value: "%49,8", source: "UNOSAT" },
    { label: "Çalışan atıksu tesisi", value: "0", source: "OCHA" },
    { label: "WASH yeniden inşa ihtiyacı", value: "2,7 Mrd $", source: "BM/OCHA" },
  ];

  const COLORS = [
    "var(--color-water)",
    "var(--color-impact)",
    "var(--color-finance)",
    "var(--color-water-soft)",
    "var(--color-risk)",
    "var(--color-muted-foreground)",
  ];

  return (
    <Section
      id="kriz"
      eyebrow="01 · Kriz"
      title="Su, sağlık ve altyapı eş zamanlı çöküyor."
      intro="Gazze'de günlük kişi başı temiz su erişimi WHO acil eşiğinin yarısının altında. Aynı dönemde WASH altyapısının büyük bölümü işlevini yitirmiş durumda."
    >
      {/* Gauge + Population */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="panel p-6 lg:col-span-2">
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <div className="eyebrow">Kişi başı günlük su</div>
              <div className="font-display text-2xl mt-1">Su erişim göstergesi</div>
            </div>
            <DataTag source="WASH R3" />
          </div>

          <div className="relative h-8 bg-surface-2 rounded-sm overflow-hidden hairline">
            <div
              className="absolute inset-y-0 left-0 bg-risk/60"
              style={{ width: `${(current / gaugeMax) * 100}%` }}
            />
            <div
              className="absolute inset-y-0 w-px bg-finance"
              style={{ left: `${(emergency / gaugeMax) * 100}%` }}
            >
              <span className="absolute -top-5 -translate-x-1/2 text-[10px] text-finance whitespace-nowrap">
                WHO acil · 15
              </span>
            </div>
            <div
              className="absolute inset-y-0 w-px bg-water"
              style={{ left: `${(prewar / gaugeMax) * 100}%` }}
            >
              <span className="absolute -bottom-5 -translate-x-1/2 text-[10px] text-water whitespace-nowrap">
                Savaş öncesi · 82,7
              </span>
            </div>
            <div
              className="absolute inset-y-0 w-px bg-impact"
              style={{ left: `${(longTerm / gaugeMax) * 100}%` }}
            >
              <span className="absolute -top-5 -translate-x-1/2 text-[10px] text-impact whitespace-nowrap">
                WHO uzun vadeli · 100
              </span>
            </div>
          </div>

          <div className="mt-10 flex items-end gap-6">
            <div>
              <div className="font-display text-6xl text-risk leading-none">
                {current}
              </div>
              <div className="text-xs text-muted-foreground mt-2">L / kişi / gün · mevcut</div>
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Mevcut erişim, WHO acil minimumunun yaklaşık <span className="text-foreground">%40'ı</span>.
              Savaş öncesi seviyenin yalnızca <span className="text-foreground">%7,4'ü</span> kadardır.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {popCards.map((c) => (
            <div key={c.label} className="panel p-4 flex flex-col justify-between min-h-[120px]">
              <div className="text-[11px] text-muted-foreground leading-tight">
                {c.label}
              </div>
              <div>
                <div className="font-display text-2xl">{c.value}</div>
                <div className="text-[10px] text-muted-foreground/70 mt-1">
                  Rapor · {c.source}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Needs + Barriers */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="panel p-6">
          <div className="flex justify-between mb-4">
            <div>
              <div className="eyebrow">Öncelikli ihtiyaç dağılımı</div>
              <div className="font-display text-xl mt-1">Tüm Gazze · %</div>
            </div>
            <DataTag source="WASH R3" />
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={needs}
                  innerRadius={50}
                  outerRadius={90}
                  dataKey="value"
                  stroke="var(--color-background)"
                  strokeWidth={2}
                >
                  {needs.map((_: any, i: number) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
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
          <div className="mt-4 grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs">
            {needs.map((n: any, i: number) => (
              <div key={n.name} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                <span className="text-muted-foreground">{n.name}</span>
                <span className="ml-auto text-foreground">%{n.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-6">
          <div className="flex justify-between mb-4">
            <div>
              <div className="eyebrow">Su erişiminin önündeki engeller</div>
              <div className="font-display text-xl mt-1">Hane bildirimi · %</div>
            </div>
            <DataTag source="WASH R3" />
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={barriers} layout="vertical" margin={{ left: 30, right: 30 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  width={150}
                />
                <Bar dataKey="value" fill="var(--color-water)" radius={[0, 2, 2, 0]} />
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
        </div>
      </div>

      {/* Health */}
      <div className="mb-8">
        <div className="eyebrow mb-3">Sağlık ve WASH yükü</div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-rule rounded-sm overflow-hidden">
          {healthCards.map((h) => (
            <div key={h.label} className="bg-surface p-4">
              <div className="text-[11px] text-muted-foreground mb-2 leading-tight">
                {h.label}
              </div>
              <div className="font-display text-2xl text-risk">{h.value}</div>
              {h.sub && <div className="text-[10px] text-muted-foreground mt-0.5">{h.sub}</div>}
              <div className="text-[10px] text-muted-foreground/70 mt-3">
                Rapor · {h.source}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Damage */}
      <div>
        <div className="eyebrow mb-3">Altyapı hasarı ve finansman ihtiyacı</div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-rule rounded-sm overflow-hidden">
          {dmgCards.map((h, i) => (
            <div key={h.label} className="bg-surface p-4">
              <div className="text-[11px] text-muted-foreground mb-2 leading-tight">
                {h.label}
              </div>
              <div
                className={`font-display text-2xl ${
                  i === 4 ? "text-finance" : "text-foreground"
                }`}
              >
                {h.value}
              </div>
              <div className="text-[10px] text-muted-foreground/70 mt-3">
                Rapor · {h.source}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function WhyFailsSection() {
  const cards = [
    {
      title: "Hibe / İnsani yardım",
      points: [
        "CAPEX var, OPEX yok",
        "Bağışçı yorgunluğu",
        "Öngörülemez fon akışı",
        "2025 Flash Appeal karşılanma oranı düşük",
      ],
    },
    {
      title: "Borçlanma",
      points: [
        "Egemen garanti sorunu",
        "Zayıf geri ödeme zemini",
        "Faizli borç katılım finansa uyumsuz",
        "Kurumsal kırılganlık",
      ],
    },
    {
      title: "Özel yatırım",
      points: [
        "Çatışma ve abluka riski",
        "WASH sektörüne düşük ticari ilgi",
        "Geri dönüş ufku belirsiz",
      ],
    },
    {
      title: "Sosyal koruma / Mikrofinans",
      points: [
        "Tüketim açığını kısmen kapatır",
        "Altyapı dönüşümü üretmez",
        "Ölçek sınırlı",
      ],
    },
  ];

  return (
    <Section
      id="yetersiz"
      eyebrow="02 · Mevcut Finansman"
      title="Hiçbir tek araç bu krizi çözmüyor."
      intro="Geleneksel araçların her biri tek başına ele alındığında WASH yeniden yapılanması için yetersiz kalıyor. Boşluk; CAPEX, OPEX, risk ve gelir akışlarını birlikte kurgulayan bir mimari ile kapanabilir."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-rule rounded-sm overflow-hidden">
        {cards.map((c, i) => (
          <div key={c.title} className="bg-surface p-6 flex flex-col">
            <div className="text-[10px] text-muted-foreground mb-3 tracking-widest">
              0{i + 1}
            </div>
            <div className="font-display text-xl mb-4">{c.title}</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.points.map((p) => (
                <li key={p} className="flex gap-2 leading-relaxed">
                  <span className="text-risk mt-1.5 w-1 h-1 rounded-full bg-current shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 panel-2 p-8 border-l-2 border-l-water">
        <div className="eyebrow mb-3">Sonuç</div>
        <p className="font-display text-2xl md:text-3xl leading-snug max-w-4xl">
          GDAF yalnızca fon toplama modeli değil; varlık oluşturma, işletme
          sürekliliği, risk tamponları ve sosyal etkiyi birlikte kurgulayan bir
          <span className="text-water"> finansman mimarisidir.</span>
        </p>
      </div>
    </Section>
  );
}
