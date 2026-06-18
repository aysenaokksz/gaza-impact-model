import { createFileRoute } from "@tanstack/react-router";
import { DashboardNav, Footer } from "@/components/gdaf/chrome";
import { Dashboard } from "@/components/gdaf/dashboard";

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
      <DashboardNav />
      <main className="mx-auto max-w-7xl px-4 md:px-6 py-6">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}
