import { queryOptions } from "@tanstack/react-query";
import { SET_OF_FIELDS_KEY } from "../query-const";
import { baseFetch } from "..";
import { setsOfFieldsSchema } from "src/05_shared/api/set-of-fields/types";
import { API_SET_OF_FIELDS } from "../urls";

export function getAllSets() {
  return queryOptions({
    queryKey: [SET_OF_FIELDS_KEY],
    queryFn: async () => {
      const data = await baseFetch(API_SET_OF_FIELDS);
      try {
        return setsOfFieldsSchema.parse(data);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },

    staleTime: 5 * 1000 * 60,
  });
}
