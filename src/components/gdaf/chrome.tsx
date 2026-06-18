import { Link } from "@tanstack/react-router";
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

export function Nav() {
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
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_ITEMS.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-background/85 border-b border-rule"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between gap-6">
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-sm border border-water/60 flex items-center justify-center">
            <span className="font-display text-water text-sm leading-none">G</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-[15px] tracking-wide">GDAF</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Impact Simulator
            </div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`px-3 py-2 text-[12.5px] tracking-wide rounded-sm transition-colors ${
                active === n.id
                  ? "text-water"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Prototip
        </div>
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
      className="relative pt-32 pb-24 px-6 overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(120,180,220,0.25), transparent 55%), radial-gradient(circle at 80% 70%, rgba(120,180,220,0.18), transparent 50%)",
        }}
      />
      <div className="mx-auto max-w-7xl">
        <div className="eyebrow mb-6">Jüri sunum prototipi · Statik veri</div>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.05] max-w-5xl">
          Gazze Dirençli<br />
          <span className="text-water">Altyapı Fonu</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Katılım finans temelli temiz su, sanitasyon ve güneş destekli WASH
          yeniden yapılanma modeli için interaktif sunum.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#kriz"
            className="px-5 py-3 bg-water text-primary-foreground text-sm tracking-wide hover:bg-water/90 transition-colors rounded-sm"
          >
            Krizi İncele
          </a>
          <a
            href="#model"
            className="px-5 py-3 border border-rule text-sm tracking-wide hover:border-water hover:text-water transition-colors rounded-sm"
          >
            Modeli Gör
          </a>
          <a
            href="#simulasyon"
            className="px-5 py-3 border border-rule text-sm tracking-wide hover:border-water hover:text-water transition-colors rounded-sm"
          >
            Simülasyonu Başlat
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-px bg-rule rounded-sm overflow-hidden">
          {kpis.map((k) => (
            <div key={k.label} className="bg-background p-5">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
                {k.label}
              </div>
              <div className="font-display text-3xl md:text-4xl text-foreground">
                {k.value}
              </div>
              {k.sub && (
                <div className="text-xs text-muted-foreground mt-1">{k.sub}</div>
              )}
              <div className="mt-4 text-[10px] text-muted-foreground/70">
                Rapor verisi · {k.source}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-muted-foreground max-w-2xl leading-relaxed border-l-2 border-water/50 pl-4">
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
    <section id={id} className="px-6 py-24 border-t border-rule scroll-mt-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <div className="eyebrow mb-4">{eyebrow}</div>
          <h2 className="font-display text-3xl md:text-5xl leading-tight">
            {title}
          </h2>
          {intro && (
            <p className="mt-5 text-muted-foreground leading-relaxed">{intro}</p>
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
      className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] px-1.5 py-0.5 rounded-sm border ${
        isRapor
          ? "border-water/40 text-water/90"
          : "border-finance/40 text-finance"
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
    <footer className="px-6 py-12 border-t border-rule">
      <div className="mx-auto max-w-7xl text-xs text-muted-foreground flex flex-wrap justify-between gap-4">
        <div>
          GDAF Impact Simulator · Statik verili interaktif prototip · Jüri sunum amaçlıdır.
        </div>
        <div className="text-muted-foreground/60">
          Yapay zekâ tasarım ve metin düzenleme aracı olarak kullanılmıştır.
        </div>
      </div>
    </footer>
  );
}
