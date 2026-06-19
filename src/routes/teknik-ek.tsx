import { createFileRoute } from "@tanstack/react-router";
import { TeknikHub } from "@/components/hubs/teknik-hub";

export const Route = createFileRoute("/teknik-ek")({
  component: TeknikHub,
});
