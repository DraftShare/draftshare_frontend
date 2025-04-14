import { baseFetch } from "..";
import { API_SET_OF_FIELDS } from "../urls";
import { SetId } from "./types";

export async function changeDefaultSet(id: SetId) {
  await baseFetch(API_SET_OF_FIELDS + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    // body: JSON.stringify(id),
  });
}
