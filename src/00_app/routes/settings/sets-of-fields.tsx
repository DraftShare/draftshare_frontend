import { createFileRoute } from "@tanstack/react-router";
import { SetsOfFields } from "src/01_pages/sets-of-fields/ui";
import { ROUTES } from "src/05_shared/api/query-const";

export const Route = createFileRoute(ROUTES.SETS_OF_FIELDS)({
  component: SetsOfFields,
});
