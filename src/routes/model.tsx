import { createFileRoute } from "@tanstack/react-router";
import { ModelHub } from "@/components/hubs/model-hub";

export const Route = createFileRoute("/model")({
  component: ModelHub,
});
