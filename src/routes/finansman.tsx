import { createFileRoute } from "@tanstack/react-router";
import { FinansmanHub } from "@/components/hubs/finansman-hub";

export const Route = createFileRoute("/finansman")({
  component: FinansmanHub,
});
