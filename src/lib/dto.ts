import { Status } from "@prisma/client";
import { z } from "zod";

export const SubtaskDto = z.object({
  id: z.string(),
  title: z.string(),
  description: z
    .string()
    .nullable()
    .transform((v) => v ?? undefined),
  dueDate: z.date().transform((d) => d.toISOString()),
  status: z.nativeEnum(Status),
});

export const TaskDto = z.object({
  id: z.string(),
  title: z.string(),
  description: z
    .string()
    .nullable()
    .transform((v) => v ?? undefined),
  dueDate: z.date().transform((d) => d.toISOString()),
  status: z.nativeEnum(Status),
  subtasks: z.array(SubtaskDto),
});

export const ProjectDto = z.object({
  id: z.string(),
  title: z.string(),
  description: z
    .string()
    .nullable()
    .transform((v) => v ?? undefined),
  dueDate: z.date().transform((d) => d.toISOString()),
  status: z.nativeEnum(Status),
  tasks: z.array(TaskDto),
});

export type ProjectDto = z.infer<typeof ProjectDto>;
