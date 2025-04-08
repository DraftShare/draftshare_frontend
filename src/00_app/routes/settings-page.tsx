import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "src/01_pages/settings-page";

export const Route = createFileRoute("/settings-page")({
  component: SettingsPage,
});
