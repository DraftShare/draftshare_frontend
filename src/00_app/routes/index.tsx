import { createFileRoute } from "@tanstack/react-router";
import { MainPage } from "src/01_pages/main-page";

export const Route = createFileRoute("/")({
  component: MainPage,
});
