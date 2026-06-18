import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const NAV_ITEMS = [
  { id: "kriz", label: "Kriz" },
  { id: "yetersiz", label: "Mevcut Finansman" },
  { id: "model", label: "GDAF Modeli" },
  { id: "mimari", label: "Finansal Mimari" },
  { id: "simulasyon", label: "Yıl Simülasyonu" },
  { id: "lojistik", label: "TR–Gazze Lojistik" },
  { id: "senaryo", label: "Senaryolar" },
  { id: "etki", label: "Etki" },
  { id: "ek", label: "Teknik Ek" },
];

const DASHBOARD_NAV = [
  { to: "/" as const, label: "Ana Sayfa", hash: undefined },
  { to: "/detay" as const, label: "Harita", hash: "lojistik" },
  { to: "/detay" as const, label: "Senaryolar", hash: "senaryo" },
  { to: "/detay" as const, label: "Finansman", hash: "mimari" },
  { to: "/detay" as const, label: "Teknik Ek", hash: "ek" },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="w-9 h-9 rounded-lg overflow-hidden flex shrink-0 shadow-sm">
        <div className="w-1/3 bg-[#1a1a1a]" />
        <div className="w-1/3 bg-[#ce1126]" />
        <div className="w-1/3 bg-[#007a3d]" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <div className="font-semibold text-[15px] text-ink tracking-tight">
            Gazze Etki Simülatörü
          </div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            GDAF Impact Simulator
          </div>
        </div>
      )}
    </Link>
  );
}

export function DashboardNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-rule shadow-sm">
      <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        <Logo />

        <nav className="hidden md:flex items-center gap-1">
          {DASHBOARD_NAV.map((n) => {
            const isActive = n.to === "/" ? pathname === "/" : false;
            return (
              <Link
                key={n.label}
                to={n.to}
                hash={n.hash}
                className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/detay"
            className="hidden sm:inline-flex px-3 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground border border-rule rounded-lg transition-colors"
          >
            Raporlar
          </Link>
          <span className="hidden sm:inline-flex px-2 py-2 text-[12px] font-medium text-muted-foreground border border-rule rounded-lg">
            TR
          </span>
          <Link
            to="/detay"
            hash="simulasyon"
            className="px-4 py-2 text-[13px] font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Simülasyonu Başlat
          </Link>
        </div>
      </div>
    </header>
  );
}

export function DetailNav() {
  const [active, setActive] = useState<string>("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV_ITEMS.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    const hero = document.getElementById("hero");
    if (hero) observer.observe(hero);
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-card/95 border-b border-rule shadow-sm"
          : "bg-card/80 backdrop-blur-sm border-b border-rule/60"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        <Logo compact />

        <nav className="hidden lg:flex items-center gap-0.5 overflow-x-auto">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`px-2.5 py-2 text-[12px] font-medium rounded-lg whitespace-nowrap transition-colors ${
                active === n.id
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <Link
          to="/"
          className="shrink-0 px-3 py-2 text-[12px] font-medium text-muted-foreground hover:text-primary border border-rule rounded-lg transition-colors"
        >
          ← Dashboard
        </Link>
      </div>
    </header>
  );
}

export function Hero() {
  const kpis = [
    { label: "Etkilenen nüfus", value: "2,13M", source: "PCBS" },
    { label: "Yerinden edilmiş", value: "1,9M", source: "OCHA" },
    { label: "Mevcut su erişimi", value: "6,1 L", sub: "kişi/gün", source: "WASH R3" },
    { label: "WHO acil standardı", value: "15 L", sub: "kişi/gün", source: "WHO" },
    { label: "Yeniden inşa ihtiyacı", value: "2,7 Mrd $", source: "BM/OCHA" },
  ];
  return (
    <section
      id="hero"
      className="relative pt-28 pb-20 px-6 overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, oklch(0.90 0.04 155 / 0.5), transparent 55%), radial-gradient(circle at 80% 70%, oklch(0.88 0.03 160 / 0.4), transparent 50%)",
        }}
      />
      <div className="mx-auto max-w-7xl">
        <div className="eyebrow mb-6">Jüri sunum prototipi · Statik veri</div>
        <h1 className="font-display text-4xl md:text-6xl leading-[1.08] max-w-5xl text-ink">
          Gazze Dirençli<br />
          <span className="text-water">Altyapı Fonu</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground leading-relaxed">
          Katılım finans temelli temiz su, sanitasyon ve güneş destekli WASH
          yeniden yapılanma modeli için interaktif sunum.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#kriz"
            className="px-5 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors rounded-lg"
          >
            Krizi İncele
          </a>
          <a
            href="#model"
            className="px-5 py-3 border border-rule text-sm font-medium hover:border-water hover:text-water transition-colors rounded-lg"
          >
            Modeli Gör
          </a>
          <a
            href="#simulasyon"
            className="px-5 py-3 border border-rule text-sm font-medium hover:border-water hover:text-water transition-colors rounded-lg"
          >
            Simülasyonu Başlat
          </a>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-3">
          {kpis.map((k) => (
            <div key={k.label} className="dash-card p-5">
              <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-2">
                {k.label}
              </div>
              <div className="text-2xl md:text-3xl font-semibold text-ink">
                {k.value}
              </div>
              {k.sub && (
                <div className="text-xs text-muted-foreground mt-1">{k.sub}</div>
              )}
              <div className="mt-3 text-[10px] text-muted-foreground/70">
                Rapor verisi · {k.source}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-foreground max-w-2xl leading-relaxed border-l-2 border-water/40 pl-4">
          Bu çalışma gerçek bir operasyonel sistem değil; jüri sunumu ve teknik
          ek amacıyla hazırlanmış statik verili interaktif prototiptir. Sayılar
          <span className="text-foreground"> rapor verisi</span> veya
          <span className="text-foreground"> temsili senaryo varsayımı</span> olarak etiketlenmiştir.
        </p>
      </div>
    </section>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-6 py-20 border-t border-rule scroll-mt-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <div className="eyebrow mb-3">{eyebrow}</div>
          <h2 className="font-display text-2xl md:text-4xl leading-tight text-ink">
            {title}
          </h2>
          {intro && (
            <p className="mt-4 text-muted-foreground leading-relaxed">{intro}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

export function DataTag({
  kind = "rapor",
  source,
}: {
  kind?: "rapor" | "senaryo";
  source?: string;
}) {
  const isRapor = kind === "rapor";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 rounded-md border ${
        isRapor
          ? "border-water/30 text-water bg-water/5"
          : "border-finance/30 text-finance bg-finance/5"
      }`}
    >
      <span className="w-1 h-1 rounded-full bg-current" />
      {isRapor ? "Rapor verisi" : "Temsili senaryo"}
      {source && <span className="text-muted-foreground normal-case tracking-normal">· {source}</span>}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-rule bg-card">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              Katılım finans temelli WASH yeniden yapılanma modeli için interaktif jüri sunum prototipi.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold text-ink mb-3">Hızlı Bağlantılar</div>
            <div className="space-y-2">
              <Link to="/" className="block text-xs text-muted-foreground hover:text-water">Ana Sayfa</Link>
              <Link to="/detay" hash="kriz" className="block text-xs text-muted-foreground hover:text-water">Kriz Analizi</Link>
              <Link to="/detay" hash="model" className="block text-xs text-muted-foreground hover:text-water">GDAF Modeli</Link>
              <Link to="/detay" hash="senaryo" className="block text-xs text-muted-foreground hover:text-water">Senaryolar</Link>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-ink mb-3">Kaynaklar</div>
            <div className="space-y-2">
              <Link to="/detay" hash="mimari" className="block text-xs text-muted-foreground hover:text-water">Finansal Mimari</Link>
              <Link to="/detay" hash="simulasyon" className="block text-xs text-muted-foreground hover:text-water">Yıl Simülasyonu</Link>
              <Link to="/detay" hash="ek" className="block text-xs text-muted-foreground hover:text-water">Teknik Ek</Link>
            </div>
          </div>
          <div className="dash-card p-4">
            <div className="text-xs font-semibold text-ink mb-2">İletişim</div>
            <p className="text-[11px] text-muted-foreground mb-3">Jüri sunumu ve teknik ek için hazırlanmıştır.</p>
            <Link
              to="/detay"
              className="inline-block px-4 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Ayrıntıları Gör
            </Link>
          </div>
        </div>
        <div className="text-xs text-muted-foreground flex flex-wrap justify-between gap-4 pt-6 border-t border-rule">
          <div>
            GDAF Impact Simulator · Statik verili interaktif prototip · Jüri sunum amaçlıdır.
          </div>
          <div className="text-muted-foreground/60">
            Yapay zekâ tasarım ve metin düzenleme aracı olarak kullanılmıştır.
          </div>
        </div>
      </div>
    </footer>
  );
}
