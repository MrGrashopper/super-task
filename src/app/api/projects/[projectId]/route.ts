import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { ProjectUpdateSchema } from "@lib/schemas";

export async function GET(
  request: Request,
  context: { params: Promise<{ projectId: string }> }
) {
  const { projectId: id } = await context.params;
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
  context: { params: Promise<{ projectId: string }> }
) {
  const { projectId: id } = await context.params;
  const parsed = ProjectUpdateSchema.parse(await request.json());
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
  context: { params: Promise<{ projectId: string }> }
) {
  const { projectId: id } = await context.params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
