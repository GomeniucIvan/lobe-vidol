import { z } from 'zod';

export const HuggingFaceModelSchema = z.object({
  avatar: z.string().optional(),
  backgroundColor: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  title: z.string().optional(),
});

export type MetaData = z.infer<typeof HuggingFaceModelSchema>;
