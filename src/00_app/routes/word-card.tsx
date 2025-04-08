import { createFileRoute } from "@tanstack/react-router";
import { WordCardScreen } from "src/01_pages/word-card-screen";

export const Route = createFileRoute("/word-card")({
  component: WordCardScreen,
});
