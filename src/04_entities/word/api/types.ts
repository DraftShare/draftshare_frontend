import { z } from "zod";

const idSchema = z.string();
const wordSchema = z.string();
const translate = z.string();
const definition = z.string();
const transcription = z.string();

export const wordCardSchema = z.object({
  id: idSchema,
  word: wordSchema,
  transcription: transcription.optional(),
  translate: translate.optional(),
  definition: definition.optional(),
});
export const addWordCardSchema = z.object({
  word: wordSchema,
  transcription: transcription.optional(),
  translate: translate.optional(),
  definition: definition.optional(),
});
export const wordsSchema = z.record(idSchema, wordCardSchema);

export type wordId = z.infer<typeof idSchema>;
export type word = z.infer<typeof wordCardSchema>;
export type words = z.infer<typeof wordsSchema>;
export type addWordCard = z.infer<typeof addWordCardSchema>;
