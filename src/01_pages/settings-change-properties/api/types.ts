import { z } from "zod";
const fieldIdSchema = z.number();
const fieldNameSchema = z.string();

export const fieldSchema = z.object({
  id: fieldIdSchema,
  name: fieldNameSchema,
});

export const fieldsSchema = z.array(fieldSchema);
// const dynamicFieldSchema = z.object({
//   id: z.optional(fieldIdSchema),
//   name: fieldNameSchema
// })

export type FieldId = z.infer<typeof fieldIdSchema>;
type FieldName = z.infer<typeof fieldNameSchema>;
export type Field = z.infer<typeof fieldSchema>;
export type DynamicField = {
  id?: FieldId;
  name: FieldName;
};
export type DataToSend = {
  fieldsToDelete: FieldId[];
  fieldsToUpsert: DynamicField[];
};
