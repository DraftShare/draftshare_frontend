import { createFileRoute } from "@tanstack/react-router";
import { CardInfo } from "src/01_pages/card-info/ui";
import { ROUTES } from "src/05_shared/api/query-const";

export const Route = createFileRoute(ROUTES.CARD_INFO)({
  component: CardInfo,
});
