import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/gdaf/chrome";
import { KrizDashboard } from "@/components/gdaf/kriz-dashboard";

export const Route = createFileRoute("/kriz")({
  head: () => ({
    meta: [
      { title: "Kriz & İhtiyaç — GDAF Impact Simulator" },
      {
        name: "description",
        content: "Gazze su krizi, nüfus, sağlık yükü ve altyapı hasarı — rapor verisi özeti.",
      },
    ],
  }),
  component: KrizPage,
});

function KrizPage() {
  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-background text-foreground">
      <SiteNav />
      <main className="flex-1 min-h-0 overflow-hidden mx-auto w-full max-w-7xl px-3 md:px-5 py-1.5 md:py-2">
        <KrizDashboard />
      </main>
    </div>
  );
}
