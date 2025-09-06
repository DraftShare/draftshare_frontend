import { createFileRoute } from "@tanstack/react-router";
import { CardInfoPage } from "src/01_pages/card-info-page";
import { ROUTES } from "src/05_shared/routes-const";

export const Route = createFileRoute(ROUTES.CARD_INFO)({
  component: CardInfoPage,
});
