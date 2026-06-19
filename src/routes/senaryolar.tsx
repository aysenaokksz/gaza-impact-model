import { createFileRoute } from "@tanstack/react-router";
import { SenaryolarHub } from "@/components/hubs/senaryolar-hub";

export const Route = createFileRoute("/senaryolar")({
  component: SenaryolarHub,
});
