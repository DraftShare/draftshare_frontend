import { createFileRoute } from "@tanstack/react-router";
import { CardsPage } from "src/01_pages/cards-page";
import { ROUTES } from "src/05_shared/routes-const";

export const Route = createFileRoute(ROUTES.LIST_OF_CARDS)({
  component: CardsPage,
});
