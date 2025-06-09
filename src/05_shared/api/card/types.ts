import { z } from "zod";
import { dynamicFieldSchema } from "../field/types";

const cardIdShcema = z.number();

export const responseIdSchema = z.object({ id: cardIdShcema });

const fieldSchema = dynamicFieldSchema.extend({
  // value: z.union([z.string(), z.null()]),
  // values: z.array(z.string()),
  value: z.array(z.string()),
});

export const cardSchema = z.object({
  id: cardIdShcema,
  fields: z.array(fieldSchema),
});

export const addCardSchema = z.object({
  fields: z.array(fieldSchema),
});

export const updateCardSchema = z.object({
  id: cardIdShcema,
  fields: z.array(fieldSchema),
});

// export const wordCardsSchema = z.record(cardIdShcema, cardSchema);

export type cardId = z.infer<typeof cardIdShcema>;
export type wordCard = z.infer<typeof cardSchema>;
// export type wordCards = z.infer<typeof wordCardsSchema>;
export type addCard = z.infer<typeof addCardSchema>;
export type field = z.infer<typeof fieldSchema>;

// =====================

export const incomingCardsSchema = z.record(z.string(), cardSchema);
export type cards = z.infer<typeof incomingCardsSchema>;
export type updateCard = z.infer<typeof updateCardSchema>;
