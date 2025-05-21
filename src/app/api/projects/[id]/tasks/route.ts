import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const tasks = await prisma.task.findMany({
    where: { projectId: id },
    orderBy: { createdAt: "asc" },
    include: { subtasks: true },
  });
  return NextResponse.json(tasks);
}

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();
  const task = await prisma.task.create({
    data: { ...body, projectId: id },
  });
  return NextResponse.json(task);
}
