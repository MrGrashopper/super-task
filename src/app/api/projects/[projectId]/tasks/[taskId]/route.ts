import { prisma } from "@lib/prisma";
import { TaskUpdateSchema } from "@lib/schemas";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await context.params;
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { subtasks: true },
  });
  if (!task) {
    return NextResponse.json(
      { message: "Aufgabe nicht gefunden" },
      { status: 404 }
    );
  }
  return NextResponse.json({
    ...task,
    dueDate: task.dueDate.toISOString(),
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
    subtasks: task.subtasks.map((s) => ({
      ...s,
      dueDate: s.dueDate.toISOString(),
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    })),
  });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await context.params;
  const body = await request.json();
  const parsed = TaskUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }
  const updated = await prisma.task.update({
    where: { id: taskId },
    data: parsed.data,
  });
  return NextResponse.json({
    ...updated,
    dueDate: updated.dueDate.toISOString(),
  });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await context.params;
  await prisma.subtask.deleteMany({ where: { taskId } });
  await prisma.task.delete({ where: { id: taskId } });
  return NextResponse.json({ success: true });
}
