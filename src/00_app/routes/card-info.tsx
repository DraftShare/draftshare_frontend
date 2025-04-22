import { createFileRoute } from "@tanstack/react-router";
import { CardInfo } from "src/01_pages/card-info/ui";
import { CARD_INFO_PATH } from "src/05_shared/api/query-const";

export const Route = createFileRoute(CARD_INFO_PATH)({
  component: CardInfo,
});
