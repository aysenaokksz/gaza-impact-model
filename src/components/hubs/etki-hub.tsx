import {
  gdaf,
  ETKI_SECTIONS,
  IMPACT_KPI_3SCALE,
  IMPACT_RATIOS,
  SOCIAL_MODULES,
  MONITORING,
} from "@/data/site-data";
import { HubLayout, HubSection } from "@/components/gdaf/hub-layout";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const CHART_DATA = IMPACT_KPI_3SCALE.map((r) => ({
  name: r.indicator.split(" ")[0],
  faz1: parseFloat(r.phase1.replace(/[^\d.]/g, "")) || 0,
  temel: parseFloat(r.base.replace(/[^\d.]/g, "")) || 0,
}));

export function EtkiHub() {
  return (
    <HubLayout
      eyebrow="Hub 05 · Etki Analizi"
      title="Para harcanmıyor, çalışıyor."
      intro="Etki, yıl bazlı yayılım ile birlikte büyür. Göstergeler Faz 1, Temel (10 yıl) ve İyimser (15 yıl) ölçeklerinde sunulur."
      sections={ETKI_SECTIONS}
    >
      <HubSection id="kpi" title="KPI'lar (3 Ölçek)" tag={{ kind: "senaryo", source: "Tablo 6.10.1" }}>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-b border-rule text-left">
                <th className="py-2 pr-4">Gösterge</th>
                <th className="py-2 pr-4">Faz 1</th>
                <th className="py-2 pr-4">Temel (10 yıl)</th>
                <th className="py-2">İyimser (15 yıl)</th>
              </tr>
            </thead>
            <tbody>
              {IMPACT_KPI_3SCALE.map((r) => (
                <tr key={r.indicator} className="border-b border-rule/50">
                  <td className="py-3 pr-4">{r.indicator}</td>
                  <td className="py-3 pr-4 text-water">{r.phase1}</td>
                  <td className="py-3 pr-4 text-impact">{r.base}</td>
                  <td className="py-3 text-muted-foreground">{r.optimistic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h-56">
          <ResponsiveContainer>
            <BarChart data={CHART_DATA}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-rule)" }} />
              <Legend />
              <Bar dataKey="faz1" name="Faz 1" fill="oklch(0.82 0.02 145)" />
              <Bar dataKey="temel" name="Temel" fill="var(--color-impact)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Erişen kişi = su kapasitesi ÷ kişi başı standart (15–50 L/gün).</p>
      </HubSection>

      <HubSection id="maliyet" title="Etki Oranları & Maliyet-Etkinlik" tag={{ kind: "senaryo" }}>
        <div className="dash-card p-8 text-center mb-6">
          <div className="eyebrow mb-2">Sosyal Geri Dönüş (SROI)</div>
          <div className="font-display text-5xl text-impact">≈ 4,3×</div>
          <p className="text-sm text-muted-foreground mt-2">≈ 430 mn $ sosyal değer (WHO WASH getiri tahmininin muhafazakâr uyarlaması)</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {IMPACT_RATIOS.filter((r) => !r.label.includes("SROI")).map((r) => (
            <div key={r.label} className="dash-card p-4">
              <div className="text-[11px] text-muted-foreground">{r.label}</div>
              <div className="font-display text-xl text-water mt-2">{r.value}</div>
              <div className="text-[10px] text-muted-foreground mt-1">{r.source}</div>
            </div>
          ))}
        </div>
      </HubSection>

      <HubSection id="sosyal" title="Tamamlayıcı Sosyal Modüller">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SOCIAL_MODULES.map((m, i) => (
            <div key={m} className="dash-card p-4">
              <div className="text-[10px] text-muted-foreground mb-1">{String(i + 1).padStart(2, "0")}</div>
              <div className="text-sm font-medium">{m}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground border-l-2 border-finance/50 pl-3">
          Bu modüller ana finansman modelinin yerine geçmez; sukuk/müşareke gelir havuzlarıyla karışmaz.
        </p>
      </HubSection>

      <HubSection id="izleme" title="İzleme & Doğrulama">
        <div className="space-y-3">
          {MONITORING.map((m) => (
            <div key={m} className="panel-2 p-4 text-sm border-l-2 border-l-water">{m}</div>
          ))}
        </div>
        <div className="mt-8 panel overflow-hidden">
          <div className="eyebrow p-4 bg-surface-2">Yönerge uyum matrisi</div>
          <div className="divide-y divide-rule">
            {gdaf.guideline_compliance.slice(8, 12).map((r: { requirement: string; site_answer: string }, i: number) => (
              <div key={i} className="grid md:grid-cols-2 gap-4 p-4 text-sm">
                <div className="text-foreground">{r.requirement}</div>
                <div className="text-muted-foreground">{r.site_answer}</div>
              </div>
            ))}
          </div>
        </div>
      </HubSection>
    </HubLayout>
  );
}
