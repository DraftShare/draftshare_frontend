import { baseFetch } from "src/05_shared/api";
import { DataToSend, fieldsSchema } from "./types";
import { API_FIELDS } from "../urls";

export async function updateAllFields(initialData: DataToSend) {
  const data = await baseFetch(API_FIELDS, {
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
