import { cardId } from "src/05_shared/api/card/types";
import { baseFetch } from "src/05_shared/api";
import { API_CARDS } from "src/05_shared/api/urls";

export async function deleteManyCards(ids: cardId[]) {
  await baseFetch(API_CARDS, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ids }),
  });
}
