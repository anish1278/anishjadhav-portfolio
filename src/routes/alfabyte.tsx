import { createFileRoute } from "@tanstack/react-router";
import Alfabyte from "@/pages/Alfabyte";
import { pageHeadFromKey } from "@/lib/seo";

export const Route = createFileRoute("/alfabyte")({
  component: Alfabyte,
  head: () => pageHeadFromKey("alfabyte"),
});
