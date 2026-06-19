import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/detay")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
