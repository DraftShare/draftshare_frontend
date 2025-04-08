import { addCard } from "src/05_shared/api/card/types";
import { baseFetch } from "src/05_shared/api";
import { API_CARDS } from "src/05_shared/api/urls";

export async function addOneCard(initialData: addCard) {
  await baseFetch(API_CARDS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(initialData),
  });
}
