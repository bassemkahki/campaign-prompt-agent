import { z } from 'zod';

export const CreativeBriefSchema = z.object({
  brand: z.string().describe("The name of the brand or company"),
  projectGoal: z.string().describe("The primary objective of the creative project"),
  artDirection: z.object({
    visualStyle: z.string().describe("Description of the overall visual aesthetic"),
    colorPalette: z.array(z.string()).describe("List of colors or color schemes"),
    lighting: z.string().describe("Description of the desired lighting style"),
  }),
  mood: z.string().describe("Atmospheric description (e.g., 'Ethereal', 'Gritty')"),
  constraints: z.array(z.string()).describe("Any creative or technical limitations"),
  deliverables: z.array(z.enum(["soul-v2", "soul-cinema", "seedance-2"])).describe("Target platform/model for the assets"),
});

export type CreativeBrief = z.infer<typeof CreativeBriefSchema>;
