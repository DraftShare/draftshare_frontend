import { z } from "zod";

const idSchema = z.string();
const wordSchema = z.string();

export const responseIdSchema = z.object({ id: idSchema });
const wordPropertySchema = z.object({
  name: z.string(),
  value: z.string(),
});
export const wordCardSchema = z.object({
  id: idSchema,
  word: wordSchema,
  properties: z.array(wordPropertySchema),
});
// .catchall(z.string());

export const addWordCardSchema = z
  .object({
    word: wordSchema,
  })
  .catchall(z.string());
export const updateWordCardSchema = z
  .object({
    id: idSchema,
    word: wordSchema,
  })
  .catchall(z.string());
export const wordsSchema = z.record(idSchema, wordCardSchema);

export type wordId = z.infer<typeof idSchema>;
export type word = z.infer<typeof wordCardSchema>;
export type words = z.infer<typeof wordsSchema>;
export type addWordCard = z.infer<typeof addWordCardSchema>;
export type updateWordCard = z.infer<typeof updateWordCardSchema>;
