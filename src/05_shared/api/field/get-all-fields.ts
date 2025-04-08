import { queryOptions } from "@tanstack/react-query";
import { baseFetch } from "..";
import { fieldsSchema } from "src/05_shared/api/field/types";
import { FIELDS_KEY } from "../query-keys";
import { API_FIELDS } from "../urls";

export function getAllFields() {
  return queryOptions({
    queryKey: [FIELDS_KEY],
    queryFn: async () => {
      const data = await baseFetch(API_FIELDS);
      try {
        return fieldsSchema.parse(data);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },

    staleTime: 5 * 1000 * 60,
  });
}
