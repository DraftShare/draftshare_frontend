import {
  DataToSend,
  setOfFieldsSchema,
} from "src/05_shared/api/set-of-fields/types";
import { baseFetch } from "..";
import { API_SET_OF_FIELDS } from "../urls";

export async function upsertSet(initialData: DataToSend) {
  const data = await baseFetch(API_SET_OF_FIELDS, {
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
