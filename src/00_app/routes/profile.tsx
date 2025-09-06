import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "src/01_pages/profile-page";
import { ROUTES } from "src/05_shared/routes-const";

export const Route = createFileRoute(ROUTES.PROFILE)({
  component: ProfilePage,
});
