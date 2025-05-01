import { createFileRoute } from "@tanstack/react-router";
import { ChangeFields } from "src/01_pages/change-fields/ui";
import { ROUTES } from "src/05_shared/api/query-const";

export const Route = createFileRoute(ROUTES.CHANGE_FIELDS)({
  component: ChangeFields,
});
