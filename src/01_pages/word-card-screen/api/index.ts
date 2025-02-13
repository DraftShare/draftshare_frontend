import { responseIdSchema } from "src/04_entities/word/@x/add-word-screen";
import { updateWordCard } from "src/04_entities/word/api/types";
import { baseFetch } from "src/05_shared/api";

export async function updateOneWord(initialData: updateWordCard) {
  const data = await baseFetch("api/words", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(initialData),
  });

  try {
    return responseIdSchema.parse(data);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
