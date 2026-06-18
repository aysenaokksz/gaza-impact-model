import { createFileRoute } from "@tanstack/react-router";
import { DetailNav, Hero, Footer } from "@/components/gdaf/chrome";
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

export const Route = createFileRoute("/detay")({
  head: () => ({
    meta: [
      { title: "Ayrıntılar — GDAF Impact Simulator" },
      {
        name: "description",
        content:
          "GDAF kriz analizi, finansal mimari, senaryolar ve teknik ek — tam sunum.",
      },
    ],
  }),
  component: Detay,
});

function Detay() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DetailNav />
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
