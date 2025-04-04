import { createFileRoute } from "@tanstack/react-router";
import { CreateSetOfFields } from "src/01_pages/set-of-fields/ui/create-set-of-fields";

export const Route = createFileRoute("/settings/set-of-fields/")({
  component: CreateSetOfFields,
});
