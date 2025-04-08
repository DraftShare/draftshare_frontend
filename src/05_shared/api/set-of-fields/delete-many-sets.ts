import { baseFetch } from "src/05_shared/api";
import { API_SET_OF_FIELDS } from "../urls";
import { SetId } from "./types";

export async function deleteManySets(initialData: SetId[]) {
  await baseFetch(API_SET_OF_FIELDS, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(initialData),
  });
}
