import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { z } from "zod";

const ProjectPatchSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  dueDate: z
    .string()
    .refine((s) => !s || !isNaN(Date.parse(s)))
    .optional(),
  status: z.enum(["Open", "InProgress", "Done"]).optional(),
});

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { tasks: { include: { subtasks: true } } },
  });
  if (!project) {
    return NextResponse.json(
      { error: "Projekt nicht gefunden" },
      { status: 404 }
    );
  }
  return NextResponse.json({
    ...project,
    dueDate: project.dueDate.toISOString(),
    tasks: project.tasks.map((t) => ({
      ...t,
      dueDate: t.dueDate.toISOString(),
      subtasks: t.subtasks.map((s) => ({
        ...s,
        dueDate: s.dueDate.toISOString(),
      })),
    })),
  });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const parsed = ProjectPatchSchema.parse(await request.json());
  const { title, description, status, dueDate } = parsed;
  const data = {
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    ...(status !== undefined && { status }),
    ...(dueDate && { dueDate: new Date(dueDate) }),
  };
  const updated = await prisma.project.update({
    where: { id },
    data,
  });
  return NextResponse.json({
    ...updated,
    dueDate: updated.dueDate.toISOString(),
  });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
