import { queryOptions } from "@tanstack/react-query";
import { SET_OF_FIELDS_KEY } from "../query-const";
import { baseFetch } from "..";
import { setOfFieldsSchema } from "src/05_shared/api/set-of-fields/types";
import { API_SET_OF_FIELDS } from "../urls";

export function getSetById(id: number) {
  return queryOptions({
    queryKey: [SET_OF_FIELDS_KEY, id],
    queryFn: async () => {
      const data = await baseFetch(API_SET_OF_FIELDS + id);
      return setOfFieldsSchema.parse(data);
    },
    staleTime: 5 * 1000 * 60,
  });
}
