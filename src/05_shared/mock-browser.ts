import { setupWorker } from "msw/browser";
import { getAllCardsHandler } from "./api/card/get-all-cards_mock";
import { getAllFieldsHandler } from "./api/field/get-all-fields_mock";
import { getAllSetsHandler } from "./api/set-of-fields/get-all-sets_mock";

export const worker = setupWorker(
  ...getAllCardsHandler,
  ...getAllFieldsHandler,
  ...getAllSetsHandler
);
