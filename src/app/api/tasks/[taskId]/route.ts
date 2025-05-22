import { prisma } from "@lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  context: { params: Promise<{ taskId: string }> }
) => {
  const { taskId } = await context.params;
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { subtasks: true },
  });
  if (!task) {
    return NextResponse.json(
      { message: "Task nicht gefunden" },
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
};

export const PATCH = async (
  req: Request,
  context: { params: Promise<{ taskId: string }> }
) => {
  const { taskId } = await context.params;
  const data = await req.json();
  const updated = await prisma.task.update({
    where: { id: taskId },
    data,
  });
  return NextResponse.json(updated);
};

export const DELETE = async (
  req: Request,
  context: { params: Promise<{ taskId: string }> }
) => {
  const { taskId } = await context.params;
  await prisma.task.delete({ where: { id: taskId } });
  return NextResponse.json({ success: true });
};
