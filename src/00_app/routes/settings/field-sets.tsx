import { createFileRoute } from "@tanstack/react-router";
import { FieldSetsPage } from "src/01_pages/field-sets-page";
import { ROUTES } from "src/05_shared/routes-const";

export const Route = createFileRoute(ROUTES.LIST_OF_FIELD_SETS)({
  component: FieldSetsPage,
});
