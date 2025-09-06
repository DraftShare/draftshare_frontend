import { createFileRoute } from "@tanstack/react-router";
import { FieldSetPage } from "src/01_pages/field-set-page";
import { ROUTES } from "src/05_shared/routes-const";

export const Route = createFileRoute(ROUTES.EDIT_FIELD_SET)({
  component: FieldSetPage,
});
