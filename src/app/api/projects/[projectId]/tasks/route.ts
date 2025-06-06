import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await context.params;
  const tasks = await prisma.task.findMany({
    where: { projectId },
    orderBy: { order: "asc" },
    include: { subtasks: true },
  });
  return NextResponse.json(tasks);
}

export async function POST(
  req: Request,
  context: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await context.params;
  const body = await req.json();
  const task = await prisma.task.create({
    data: { ...body, projectId },
  });
  return NextResponse.json(task);
}
