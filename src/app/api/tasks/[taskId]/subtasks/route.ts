// app/api/tasks/[taskId]/subtasks/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await context.params;
  const subtasks = await prisma.subtask.findMany({
    where: { taskId },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(subtasks);
}

export async function POST(
  req: Request,
  context: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await context.params;
  const body = await req.json();
  const created = await prisma.subtask.create({
    data: {
      ...body,
      taskId,
    },
  });
  return NextResponse.json(created);
}
