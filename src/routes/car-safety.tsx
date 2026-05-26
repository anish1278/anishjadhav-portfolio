import { createFileRoute } from "@tanstack/react-router";
import CarSafety from "@/pages/CarSafety";
import { pageHeadFromKey } from "@/lib/seo";

export const Route = createFileRoute("/car-safety")({
  component: CarSafety,
  head: () => pageHeadFromKey("carSafety"),
});
