import { queryOptions } from "@tanstack/react-query";
import { baseFetch } from "src/05_shared/api";
import { DataToSend, fieldsSchema } from "./types";

export function getAllFields() {
  return queryOptions({
    queryKey: ["fields"],
    queryFn: async () => {
      const data = await baseFetch("api/fields/");
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

export async function update(initialData: DataToSend) {
  console.log("initialData: ", initialData);
  const data = await baseFetch("api/fields", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(initialData),
  });

  try {
    return fieldsSchema.parse(data);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
