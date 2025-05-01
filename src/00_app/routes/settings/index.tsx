import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "src/01_pages/settings-page";
import { ROUTES } from "src/05_shared/api/query-const";

export const Route = createFileRoute(`${ROUTES.SETTINGS}/`)({
  component: SettingsPage,
});
