import { queryOptions } from "@tanstack/react-query";
import { baseFetch } from "src/05_shared/api";
import { word, wordArrSchema, wordSchema } from "./types";

export const getAllWords = () => {
  return queryOptions({
    queryKey: ["words"],
    queryFn: async () => {
      const data = await baseFetch("api/words/");
      try {
        return wordArrSchema.parse(data);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },

    staleTime: 5 * 1000 * 60,
  });
};


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
