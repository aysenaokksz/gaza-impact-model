import { Link, useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { HUB_NAV, SITE } from "@/data/site-data";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="w-9 h-9 rounded-lg overflow-hidden flex shrink-0 shadow-sm border border-rule/60">
        <svg viewBox="0 0 36 36" className="w-full h-full" aria-hidden>
          <rect x="0" y="0" width="36" height="12" fill="#000000" />
          <rect x="0" y="12" width="36" height="12" fill="#FFFFFF" />
          <rect x="0" y="24" width="36" height="12" fill="#007A3D" />
          <path d="M0 0 L13 18 L0 36 Z" fill="#CE1126" />
        </svg>
      </div>
      {!compact && (
        <div className="leading-tight">
          <div className="font-semibold text-[15px] text-ink tracking-tight">{SITE.name}</div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{SITE.subtitle}</div>
        </div>
      )}
    </Link>
  );
}

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-rule shadow-sm">
      <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between gap-3">
        <Logo />
        <nav className="hidden lg:flex items-center gap-0.5 overflow-x-auto">
          {HUB_NAV.map((n) => {
            const active = n.match(pathname);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-2.5 py-2 text-[12px] font-medium rounded-lg whitespace-nowrap transition-colors ${
                  active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/kriz"
            className="hidden sm:inline-flex px-3 py-2 text-[12px] font-medium text-muted-foreground hover:text-foreground border border-rule rounded-lg transition-colors"
          >
            Raporlar
          </Link>
          <Link
            to="/model"
            className="px-3 py-2 text-[12px] font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Modeli incele
          </Link>
        </div>
      </div>
      <nav className="lg:hidden border-t border-rule px-4 py-2 flex gap-1 overflow-x-auto">
        {HUB_NAV.map((n) => {
          const active = n.match(pathname);
          return (
            <Link
              key={n.to}
              to={n.to}
              className={`px-2.5 py-1.5 text-[11px] font-medium rounded-md whitespace-nowrap ${
                active ? "text-primary bg-primary/10" : "text-muted-foreground"
              }`}
            >
              {n.label}
            </Link>
          );
        })}
      </nav>
    </header>
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
          <h2 className="font-display text-2xl md:text-4xl leading-tight text-ink">{title}</h2>
          {intro && <p className="mt-4 text-muted-foreground leading-relaxed">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function DataTag({ kind = "rapor", source }: { kind?: "rapor" | "senaryo"; source?: string }) {
  const isRapor = kind === "rapor";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 rounded-md border ${
        isRapor ? "border-water/30 text-water bg-water/5" : "border-finance/30 text-finance bg-finance/5"
      }`}
    >
      <span className="w-1 h-1 rounded-full bg-current" />
      {isRapor ? "Rapor verisi" : "Temsili senaryo"}
      {source && <span className="text-muted-foreground normal-case tracking-normal">· {source}</span>}
    </span>
  );
}

export function Footer({ showPrototypeWarning = true }: { showPrototypeWarning?: boolean }) {
  return (
    <footer className="px-6 py-12 border-t border-rule bg-card mt-12">
      <div className="mx-auto max-w-7xl">
        <div className={`grid gap-8 mb-10 ${showPrototypeWarning ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">{SITE.tagline}</p>
          </div>
          <div>
            <div className="text-xs font-semibold text-ink mb-3">Hub'lar</div>
            <div className="space-y-2">
              <Link to="/kriz" className="block text-xs text-muted-foreground hover:text-water">Kriz</Link>
              <Link to="/model" className="block text-xs text-muted-foreground hover:text-water">Model</Link>
              <Link to="/finansman" className="block text-xs text-muted-foreground hover:text-water">Finansman</Link>
              <Link to="/senaryolar" className="block text-xs text-muted-foreground hover:text-water">Senaryolar</Link>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-ink mb-3">Analiz</div>
            <div className="space-y-2">
              <Link to="/etki" className="block text-xs text-muted-foreground hover:text-water">Etki</Link>
              <Link to="/degerlendirme" className="block text-xs text-muted-foreground hover:text-water">Değerlendirme</Link>
              <Link to="/teknik-ek" className="block text-xs text-muted-foreground hover:text-water">Teknik Ek</Link>
            </div>
          </div>
          {showPrototypeWarning && (
            <div className="dash-card p-4">
              <div className="text-xs font-semibold text-ink mb-2">Uyarı</div>
              <p className="text-[11px] text-muted-foreground mb-3">{SITE.prototypeWarning}</p>
            </div>
          )}
        </div>
        <div className="text-xs text-muted-foreground flex flex-wrap justify-between gap-4 pt-6 border-t border-rule">
          <div>GDAF Impact Simulator · Statik verili interaktif prototip</div>
          <div className="text-muted-foreground/60">Yapay zekâ tasarım ve metin düzenleme aracı olarak kullanılmıştır.</div>
        </div>
      </div>
    </footer>
  );
}
