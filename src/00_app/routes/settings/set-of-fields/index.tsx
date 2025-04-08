import { createFileRoute } from "@tanstack/react-router";
import { SetOfFieldsForm } from "src/01_pages/set-of-fields/ui";

export const Route = createFileRoute("/settings/set-of-fields/")({
  component: SetOfFieldsForm,
});
