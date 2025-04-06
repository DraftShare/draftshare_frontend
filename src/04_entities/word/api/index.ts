import { queryOptions } from "@tanstack/react-query";
import { baseFetch } from "src/05_shared/api";
import { incomingCardsSchema } from "./types";
import { API_CARDS } from "src/05_shared/api/urls";
import { CARDS_KEY } from "src/05_shared/api/query-keys";

export const getAllWords = () => {
  return queryOptions({
    queryKey: [CARDS_KEY],
    queryFn: async () => {
      const data = await baseFetch(API_CARDS);
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
