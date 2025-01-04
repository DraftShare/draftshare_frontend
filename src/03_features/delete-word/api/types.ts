import { z } from "zod";

export const deleteResultSchema = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});


