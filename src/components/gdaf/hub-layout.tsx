import { useEffect, useState, type ReactNode } from "react";
import { SITE } from "@/data/site-data";
import { Footer, SiteNav, DataTag } from "./chrome";

export type HubSection = { id: string; label: string };

export function HubLayout({
  eyebrow,
  title,
  intro,
  sections,
  children,
  showPrototypeWarning = true,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  sections: HubSection[];
  children: ReactNode;
  showPrototypeWarning?: boolean;
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        <div className="mb-8 max-w-3xl">
          <div className="eyebrow mb-2">{eyebrow}</div>
          <h1 className="font-display text-3xl md:text-4xl text-ink leading-tight">{title}</h1>
          {intro && <p className="mt-3 text-muted-foreground leading-relaxed">{intro}</p>}
          {showPrototypeWarning && (
            <p className="mt-4 text-xs text-muted-foreground border-l-2 border-water/40 pl-3">
              {SITE.prototypeWarning}
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-52 shrink-0">
            <nav className="lg:sticky lg:top-24 space-y-1">
              <div className="eyebrow mb-3 hidden lg:block">Alt Menü</div>
              <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`px-3 py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${
                      active === s.id
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </nav>
          </aside>

          <div className="flex-1 min-w-0 space-y-16">{children}</div>
        </div>
      </div>
      <Footer showPrototypeWarning={showPrototypeWarning} />
    </div>
  );
}

export function HubSection({
  id,
  title,
  intro,
  tag,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  tag?: { kind?: "rapor" | "senaryo"; source?: string };
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl md:text-2xl text-ink">{title}</h2>
          {intro && <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">{intro}</p>}
        </div>
        {tag && <DataTag kind={tag.kind} source={tag.source} />}
      </div>
      {children}
    </section>
  );
}
