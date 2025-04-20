import { createFileRoute } from "@tanstack/react-router";
import { CardInfo } from "src/01_pages/card-info/ui";

export const Route = createFileRoute("/card-info")({
  component: CardInfo,
});
