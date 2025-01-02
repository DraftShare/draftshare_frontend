import { z } from "zod";

export const wordSchema = z.object({
  word: z.string(),
  translate: z.string(),
  definition: z.string(),
});

export const wordArrSchema = z.array(wordSchema);
export type word = z.infer<typeof wordSchema>;