import { createFileRoute } from "@tanstack/react-router";
import { AddCardPage } from "src/01_pages/add-card-page";
import { ROUTES } from "src/05_shared/routes-const";

export const Route = createFileRoute(ROUTES.ADD_CARD)({
  component: AddCardPage,
});
