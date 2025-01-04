import { word, wordSchema } from "src/04_entities/word/@x/add-word-screen";
import { baseFetch } from "src/05_shared/api";

export async function addOneWord(initialData: word) {
  const data = await baseFetch("api/words", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(initialData),
  });

  try {
    return wordSchema.parse(data);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
