import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "src/01_pages/settings-page";
import { SETTINGS_PAGE_PATH } from "src/05_shared/api/query-const";

export const Route = createFileRoute(SETTINGS_PAGE_PATH)({
  component: SettingsPage,
});
