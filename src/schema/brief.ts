import { z } from 'zod';

export const ShotBreakdownSchema = z.object({
  id: z.string().describe("Unique identifier for the shot"),
  description: z.string().describe("Raw description of the shot"),
  subject: z.string().describe("Main subject of the shot"),
  outfit: z.string().describe("What the subject is wearing"),
  pose: z.string().describe("Subject's pose or action"),
  location: z.string().optional().describe("Physical location (deprecated)"),
  environment: z.string().describe("The setting or background"),
  camera: z.string().describe("Camera type or angle"),
  lens: z.string().describe("Lens type (e.g., 50mm, wide)"),
  shotType: z.string().describe("Shot framing (e.g., ECU, Wide)"),
  lightingOverride: z.string().optional().describe("Specific lighting for this shot"),
});

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
  shotBreakdowns: z.array(ShotBreakdownSchema).default([]).describe("Individual shot breakdowns identified in the brief"),
});

export type ShotBreakdown = z.infer<typeof ShotBreakdownSchema>;
export type CreativeBrief = z.infer<typeof CreativeBriefSchema>;
