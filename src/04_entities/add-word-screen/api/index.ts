import { addCard } from "src/04_entities/word/api/types";
import { baseFetch } from "src/05_shared/api";
import { API_CARDS } from "src/05_shared/api/urls";

export async function addOneWord(initialData: addCard) {
  // const data =
  await baseFetch(API_CARDS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(initialData),
  });

  // try {
  //   return responseIdSchema.parse(data);
  // } catch (e) {
  //   console.log(e);
  //   throw e;
  // }
}
