import { z } from "zod";

export const visualizerCompositionSchema = z.object({
  audioFileUrl: z.string(),
  audioOffsetInSeconds: z.number().min(0),
});

export type AudiogramCompositionSchemaType = z.infer<
  typeof visualizerCompositionSchema
>;
