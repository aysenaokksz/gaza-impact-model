import { createFileRoute } from "@tanstack/react-router";
import { Nav, Hero, Footer } from "@/components/gdaf/chrome";
import { CrisisSection, WhyFailsSection } from "@/components/gdaf/crisis";
import {
  ModelSection,
  FinancialArchitectureSection,
  SeparatePoolsSection,
  MoneyChainSection,
} from "@/components/gdaf/model";
import { YearSimulationSection } from "@/components/gdaf/year-simulation";
import { TurkeyGazaSection } from "@/components/gdaf/turkey-gaza";
import { ScenariosSection } from "@/components/gdaf/scenarios";
import { ImpactSection, TechnicalAppendixSection } from "@/components/gdaf/impact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GDAF Impact Simulator — Gazze Dirençli Altyapı Fonu" },
      {
        name: "description",
        content:
          "Katılım finans temelli WASH yeniden yapılanma modeli için interaktif jüri sunum prototipi.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <CrisisSection />
        <WhyFailsSection />
        <ModelSection />
        <FinancialArchitectureSection />
        <SeparatePoolsSection />
        <MoneyChainSection />
        <YearSimulationSection />
        <TurkeyGazaSection />
        <ScenariosSection />
        <ImpactSection />
        <TechnicalAppendixSection />
      </main>
      <Footer />
    </div>
  );
}
