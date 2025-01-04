import { z } from "zod";

const idSchema = z.string();

export const wordSchema = z.object({
  id: idSchema,
  word: z.string(),
  translate: z.string().optional(),
  definition: z.string().optional(),
});
export const wordsSchema = z.record(idSchema, wordSchema);

export type wordId = z.infer<typeof idSchema>;
export type word = z.infer<typeof wordSchema>;
export type words = z.infer<typeof wordsSchema>;
