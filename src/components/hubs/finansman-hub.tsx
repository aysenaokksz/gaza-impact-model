import { gdaf, FINANSMAN_SECTIONS, POOL_WARNINGS } from "@/data/site-data";
import { HubLayout, HubSection } from "@/components/gdaf/hub-layout";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const POOL_COLORS: Record<string, string> = {
  "Vakıf sermayesi": "var(--color-impact)",
  "Sosyal etkili sukuk": "var(--color-water)",
  "Kitle fonlaması": "var(--color-water-soft)",
  "Hibe / teberru": "var(--color-finance)",
  "Karz-ı hasen": "var(--color-risk)",
};

export function FinansmanHub() {
  const fa = gdaf.financial_architecture;
  const sources = fa.source_allocation;
  const uses = fa.use_of_funds.map((u: { use: string; share_pct: number; amount_usd: number; note: string }) => ({
    name: u.use,
    value: u.share_pct,
    amount: `${(u.amount_usd / 1_000_000).toFixed(0)} mn $`,
    note: u.note,
  }));

  return (
    <HubLayout
      eyebrow="Hub 03 · Finansman & Nakit Akışı"
      title="200 milyon dolarlık temel yapı."
      intro="Toplam kaynak beş katmandan oluşur. Her katmanın hukuki niteliği, gelir hakkı ve kullanım disiplini farklıdır."
      sections={FINANSMAN_SECTIONS}
      showPrototypeWarning={false}
    >
      <HubSection id="kaynak" title="Kaynak Kompozisyonu (Faz 1)" tag={{ kind: "senaryo" }}>
        <div className="panel p-6">
          <div className="h-56 mb-4">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={sources} innerRadius={55} outerRadius={90} dataKey="share_pct" nameKey="source" stroke="var(--color-background)" strokeWidth={2}>
                  {sources.map((s: { source: string }, i: number) => (
                    <Cell key={i} fill={POOL_COLORS[s.source] || "var(--color-water)"} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-rule)", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {sources.map((s: { source: string; amount_label: string; share_pct: number; nature: string }) => (
              <div key={s.source} className="flex gap-3 text-xs border-t border-rule pt-2">
                <span className="text-foreground min-w-[140px] font-medium">{s.source}</span>
                <span className="text-muted-foreground flex-1">{s.nature}</span>
                <span className="font-display">{s.amount_label}</span>
                <span className="text-muted-foreground w-10 text-right">%{s.share_pct}</span>
              </div>
            ))}
          </div>
        </div>
      </HubSection>

      <HubSection id="tahsis" title="Fon Tahsis Planı" tag={{ kind: "senaryo" }}>
        <div className="panel p-6">
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={uses} layout="vertical" margin={{ left: 10, right: 20 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={170} axisLine={false} tickLine={false} />
                <Bar dataKey="value" radius={[0, 2, 2, 0]} fill="var(--color-water)" />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-rule)", fontSize: 12 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </HubSection>

      <HubSection id="havuzlar" title="Havuz Ayrımı" tag={{ kind: "senaryo" }}>
        <div className="grid md:grid-cols-2 gap-3 mb-6">
          {fa.separate_pools.map((p: { pool: string; amount: string; asset: string; revenue_right: string }) => (
            <div key={p.pool} className="dash-card p-5">
              <div className="font-display text-water">{p.pool}</div>
              <div className="text-sm font-semibold mt-1">{p.amount}</div>
              <p className="text-xs text-muted-foreground mt-3"><span className="text-foreground">Varlık:</span> {p.asset}</p>
              <p className="text-xs text-muted-foreground mt-2">{p.revenue_right}</p>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-2">
          {POOL_WARNINGS.map((w) => (
            <div key={w} className="panel-2 p-4 border-l-2 border-l-risk text-sm">{w}</div>
          ))}
        </div>
      </HubSection>

      <HubSection id="gelir" title="Gelir Üretim Varsayımları (Olgun Yıl)" tag={{ kind: "senaryo" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-b border-rule text-left">
                <th className="py-2 pr-4 eyebrow">Kaynak</th>
                <th className="py-2 pr-4">Yatırım</th>
                <th className="py-2 pr-4">Getiri</th>
                <th className="py-2">Yıllık Gelir</th>
              </tr>
            </thead>
            <tbody>
              {fa.revenue_assumptions_mature_year.slice(0, 3).map((r: { revenue_source: string; investment: string; return_pct: number; annual_revenue: string; starts: string }) => (
                <tr key={r.revenue_source} className="border-b border-rule/50">
                  <td className="py-3 pr-4">{r.revenue_source}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{r.investment}</td>
                  <td className="py-3 pr-4 text-finance">%{r.return_pct}</td>
                  <td className="py-3 font-display text-water">{r.annual_revenue}</td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="py-3" colSpan={3}>Toplam olgun kapasite</td>
                <td className="py-3 font-display text-water">11 mn $ / yıl</td>
              </tr>
            </tbody>
          </table>
        </div>
      </HubSection>

      <HubSection id="selale" title="Gelir Dağıtım Şelalesi" tag={{ kind: "senaryo" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-px bg-rule rounded-sm overflow-hidden">
          {fa.cash_flow_waterfall_mature_year.map((w: { item: string; amount: string; note: string }, i: number) => (
            <div key={w.item} className="bg-surface p-4">
              <div className="text-[10px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</div>
              <div className="text-xs mt-2 leading-snug">{w.item}</div>
              <div className="font-display text-lg text-finance mt-2">{w.amount}</div>
              <div className="text-[10px] text-muted-foreground mt-1">{w.note}</div>
            </div>
          ))}
        </div>
      </HubSection>

      <HubSection id="karz" title="Karz-ı Hasen & Rezerv Yapısı" tag={{ kind: "senaryo" }}>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="panel p-5">
            <div className="eyebrow mb-3">Karz-ı Hasen Geri Ödemesi</div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground text-left border-b border-rule">
                  <th className="py-2">Yıl</th><th className="py-2">Ödeme</th><th className="py-2">Kalan</th>
                </tr>
              </thead>
              <tbody>
                {fa.qard_hasan_repayment.map((r: { year: number; annual_payment: string; remaining_balance: string }) => (
                  <tr key={r.year} className="border-b border-rule/50">
                    <td className="py-2">{r.year}</td>
                    <td className="py-2">{r.annual_payment}</td>
                    <td className="py-2 text-water">{r.remaining_balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-3">
            {fa.risk_buffers.map((b: { buffer: string; amount: string; function: string }) => (
              <div key={b.buffer} className="dash-card p-4">
                <div className="font-display text-base">{b.buffer}</div>
                <div className="text-water font-semibold text-sm mt-1">{b.amount}</div>
                <p className="text-xs text-muted-foreground mt-2">{b.function}</p>
              </div>
            ))}
          </div>
        </div>
      </HubSection>
    </HubLayout>
  );
}
