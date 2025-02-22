import { z } from "zod";

const cardIdShcema = z.string();
const wordSchema = z.string();

const propertyIdSchema = z.string();
const propertyNameSchema = z.string();
const propertyValueSchema = z.string();

export const responseIdSchema = z.object({ id: cardIdShcema });

const propertySchema = z.object({
  _id: propertyIdSchema,
  word: cardIdShcema,
  name: propertyNameSchema,
  value: propertyValueSchema,
});
export const cardSchema = z.object({
  _id: cardIdShcema,
  word: wordSchema,
  properties: z.array(propertySchema),
});

const addCardPropertySchema = z.object({
  name: propertyNameSchema,
  value: propertyValueSchema,
});
export const addCardSchema = z.object({
  word: wordSchema,
  properties: z.array(addCardPropertySchema),
});


export const wordCardsSchema = z.record(cardIdShcema, cardSchema);

export type cardId = z.infer<typeof cardIdShcema>;
export type wordCard = z.infer<typeof cardSchema>;
export type wordCards = z.infer<typeof wordCardsSchema>;
export type addWordCard = z.infer<typeof addCardSchema>;
