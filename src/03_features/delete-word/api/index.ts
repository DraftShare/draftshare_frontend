import { baseFetch } from "src/05_shared/api";
import { deleteResultSchema } from "./types";

export async function deleteWords(ids: string[]) {
  const data = await baseFetch("api/words", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ids}),
  });

  try {
    return deleteResultSchema.parse(data);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
