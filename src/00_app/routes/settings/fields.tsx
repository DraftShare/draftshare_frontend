import { createFileRoute } from "@tanstack/react-router";
import { FieldsPage } from "src/01_pages/fields-page";
import { ROUTES } from "src/05_shared/routes-const";

export const Route = createFileRoute(ROUTES.LIST_OF_FIELDS)({
  component: FieldsPage,
});
