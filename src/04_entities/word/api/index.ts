import { queryOptions } from "@tanstack/react-query";
import { baseFetch } from "src/05_shared/api";
import { incomingCardsSchema } from "./types";

export const getAllWords = () => {
  return queryOptions({
    queryKey: ["cards"],
    queryFn: async () => {
      const data = await baseFetch("api/cards/");
      try {
        return incomingCardsSchema.parse(data);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },

    staleTime: 5 * 1000 * 60,
  });
};
