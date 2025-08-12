import { z } from "zod";
const fieldIdSchema = z.number();
const fieldNameSchema = z.string();
const fieldTypeSchema = z.enum(["TEXT", "SELECT", "MULTISELECT"]);
const fieldOptionSchema = z.string();

export const fieldSchema = z.object({
  id: fieldIdSchema,
  name: fieldNameSchema,
  type: fieldTypeSchema,
  options: z.array(z.string()),
});

export const fieldsSchema = z.array(fieldSchema);
export const dynamicFieldSchema = z.object({
  id: z.optional(fieldIdSchema),
  name: fieldNameSchema,
  type: fieldTypeSchema,
  options: z.optional(z.array(fieldOptionSchema)),
})

export type FieldId = z.infer<typeof fieldIdSchema>;
export type FieldName = z.infer<typeof fieldNameSchema>;
export type FieldType = z.infer<typeof fieldTypeSchema>;
export type Field = z.infer<typeof fieldSchema>;
export type DynamicField = z.infer<typeof dynamicFieldSchema>;
export type DataToSend = {
  fieldsToDelete: FieldId[];
  fieldsToUpsert: DynamicField[];
};
