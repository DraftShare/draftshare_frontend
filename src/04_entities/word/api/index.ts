import { queryOptions } from "@tanstack/react-query";
import { baseFetch } from "src/05_shared/api";
import { wordCardsSchema } from "./types";

export const getAllWords = () => {
  return queryOptions({
    queryKey: ["words"],
    queryFn: async () => {
      const data = await baseFetch("api/words/");
      try {
        return wordCardsSchema.parse(data);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },

    staleTime: 5 * 1000 * 60,
  });
};
