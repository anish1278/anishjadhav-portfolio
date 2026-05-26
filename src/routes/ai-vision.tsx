import { createFileRoute } from "@tanstack/react-router";
import AIVision from "@/pages/AI Vision";
import { pageHeadFromKey } from "@/lib/seo";

export const Route = createFileRoute("/ai-vision")({
  component: AIVision,
  head: () => pageHeadFromKey("aiVision"),
});
