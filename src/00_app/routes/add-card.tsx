import { createFileRoute } from "@tanstack/react-router";
import { AddCard } from "src/01_pages/add-card/ui";
import { ADD_CARD_PATH } from "src/05_shared/api/query-const";

export const Route = createFileRoute(ADD_CARD_PATH)({
  component: AddCard,
});
