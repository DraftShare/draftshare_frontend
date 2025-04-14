import { fieldSchema } from "src/05_shared/api/field/types";
import { z } from "zod";

const setIdSchema = z.number();
const setNameSchema = z.string();
const defaultSetSchema = z.boolean();

export const setOfFieldsSchema = z.object({
  id: setIdSchema,
  name: setNameSchema,
  fields: z.array(fieldSchema),
  defaultSet: defaultSetSchema,
});
export const setsOfFieldsSchema = z.array(setOfFieldsSchema);
export const deleteResponseSchema = z.null();

export type DataToSend = {
  id?: SetId;
  name: string;
  fields: string[];
};
export type SetId = z.infer<typeof setIdSchema>;
export type SetName = z.infer<typeof setNameSchema>;
export type setOfFields = z.infer<typeof setOfFieldsSchema>;
