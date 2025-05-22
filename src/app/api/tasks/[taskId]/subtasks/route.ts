import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import type { Status } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = await params;
  const subs = await prisma.subtask.findMany({
    where: { taskId },
    orderBy: { createdAt: "asc" },
  });
  const data = subs.map((s) => ({
    ...s,
    dueDate: s.dueDate.toISOString(),
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }));
  return NextResponse.json(data);
}

export async function POST(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = await params;
  const body = (await request.json()) as {
    title: string;
    description?: string;
    dueDate: string;
    status: Status;
  };
  const created = await prisma.subtask.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
      dueDate: new Date(body.dueDate),
      taskId,
    },
  });
  return NextResponse.json({
    ...created,
    dueDate: created.dueDate.toISOString(),
    createdAt: created.createdAt.toISOString(),
    updatedAt: created.updatedAt.toISOString(),
  });
}
