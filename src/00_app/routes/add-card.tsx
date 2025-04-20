import { createFileRoute } from "@tanstack/react-router";
import { AddCard } from "src/01_pages/add-card/ui";

export const Route = createFileRoute("/add-card")({
  component: AddCard,
});
