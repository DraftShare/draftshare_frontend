import { updateCard } from "src/04_entities/word/api/types";
import { baseFetch } from "src/05_shared/api";
import { API_CARDS } from "src/05_shared/api/urls";

export async function updateOneWord(initialData: updateCard) {
  await baseFetch(API_CARDS, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(initialData),
  });
}
