import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "src/01_pages/settings-page";
import { ROUTES } from "src/05_shared/routes-const";

export const Route = createFileRoute(ROUTES.SETTINGS)({
  component: SettingsPage,
});
