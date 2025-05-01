import { createFileRoute } from "@tanstack/react-router";
import { AddCard } from "src/01_pages/add-card/ui";
import { ROUTES } from "src/05_shared/api/query-const";

export const Route = createFileRoute(ROUTES.ADD_CARD)({
  component: AddCard,
});
