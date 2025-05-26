import { Status } from "@prisma/client";
import { z } from "zod";

export const ProjectUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  dueDate: z
    .string()
    .refine((s) => !s || !isNaN(Date.parse(s)))
    .optional(),
  status: z.nativeEnum(Status).optional(),
});

export const TaskUpdateSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.nativeEnum(Status).optional(),
    dueDate: z
      .string()
      .optional()
      .refine((s) => !s || !isNaN(Date.parse(s)))
      .transform((s) => (s ? new Date(s) : undefined)),
  })
  .strict();

export type ProjectPatch = z.infer<typeof ProjectUpdateSchema>;
export type TaskPatch = z.infer<typeof TaskUpdateSchema>;
