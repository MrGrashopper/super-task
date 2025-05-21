import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

export const GET = async (_: Request, { params }: { params: { id: string } }) =>
  NextResponse.json(
    await prisma.task.findMany({
      where: { projectId: params.id },
      orderBy: { createdAt: "asc" },
      include: { subtasks: true },
    })
  );

export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const body = await req.json();
  return NextResponse.json(
    await prisma.task.create({ data: { ...body, projectId: params.id } })
  );
};

// src/app/api/tasks/[taskId]/route.ts
export const PATCH = async (
  req: Request,
  { params }: { params: { taskId: string } }
) => {
  const data = await req.json();
  return NextResponse.json(
    await prisma.task.update({ where: { id: params.taskId }, data })
  );
};

export const DELETE = async (
  _: Request,
  { params }: { params: { taskId: string } }
) =>
  NextResponse.json(await prisma.task.delete({ where: { id: params.taskId } }));
