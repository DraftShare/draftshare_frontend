import { baseFetch } from "src/05_shared/api";
import { DataToSend, deleteResponseSchema, SetId, setOfFieldsSchema, setsOfFieldsSchema } from "./types";
import { queryOptions } from "@tanstack/react-query";
import { SET_OF_FIELDS_KEY } from "src/05_shared/api/query-keys";

export function getAll() {
  return queryOptions({
    queryKey: [SET_OF_FIELDS_KEY],
    queryFn: async () => {
      const data = await baseFetch("api/sets-of-fields");
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

export function getById(id: number) {
  return queryOptions({
    queryKey: [SET_OF_FIELDS_KEY, id],
    queryFn: async () => {
      const data = await baseFetch(`api/sets-of-fields/${id}`);
      return setOfFieldsSchema.parse(data);
    },
    staleTime: 5 * 1000 * 60,
  });
}

export async function upsert(initialData: DataToSend) {
  const data = await baseFetch("api/sets-of-fields", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(initialData),
  });

  try {
    return setOfFieldsSchema.parse(data);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function deleteMany(initialData: SetId[]) {
  const data = await baseFetch("api/sets-of-fields", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(initialData),
  });

  try {
    return deleteResponseSchema.parse(data);
  } catch (e) {
    console.log(e);
    throw e;
  }

  // try {
  //   console.log(data)
  //   // return setOfFieldsSchema.parse(data);
  // } catch (e) {
  //   // console.log(e);
  //   // throw e;
  // }
}