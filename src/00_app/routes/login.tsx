import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "src/01_pages/login-page";
import { ROUTES } from "src/05_shared/routes-const";

export const Route = createFileRoute(ROUTES.LOGIN)({
  component: LoginPage,
});
