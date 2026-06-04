import { z } from 'zod';

export const PromptOutputSchema = z.object({
  shotId: z.string().describe("Reference to the specific shot"),
  model: z.enum(["soul-v2", "soul-cinema", "seedance-2"]).describe("AI model used for prompt generation"),
  prompt: z.string().describe("The generated positive prompt"),
  negativePrompt: z.string().optional().describe("Generated negative prompt if applicable"),
  metadata: z.record(z.any()).optional().describe("Additional generation parameters"),
});

export type PromptOutput = z.infer<typeof PromptOutputSchema>;
