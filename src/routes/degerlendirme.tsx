import { createFileRoute } from "@tanstack/react-router";
import { DegerlendirmeHub } from "@/components/hubs/degerlendirme-hub";

export const Route = createFileRoute("/degerlendirme")({
  component: DegerlendirmeHub,
});
