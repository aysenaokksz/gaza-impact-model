import { createFileRoute } from "@tanstack/react-router";
import { EtkiHub } from "@/components/hubs/etki-hub";

export const Route = createFileRoute("/etki")({
  component: EtkiHub,
});
