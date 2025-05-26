import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

export async function GET(
  request: Request,
  context: { params: Promise<{ subtaskId: string }> }
) {
  const { subtaskId } = await context.params;
  const subtask = await prisma.subtask.findUnique({
    where: { id: subtaskId },
  });
  if (!subtask) {
    return NextResponse.json(
      { error: "Subtask nicht gefunden" },
      { status: 404 }
    );
  }
  return NextResponse.json(subtask);
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ subtaskId: string }> }
) {
  const { subtaskId } = await context.params;
  const exists = await prisma.subtask.findUnique({
    where: { id: subtaskId },
  });
  if (!exists) {
    return NextResponse.json(
      { error: "Unteraufgabe nicht gefunden" },
      { status: 404 }
    );
  }

  const data = await request.json();
  const updated = await prisma.subtask.update({
    where: { id: subtaskId },
    data: {
      ...data,
      ...(data.dueDate && { dueDate: new Date(data.dueDate) }),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ subtaskId: string }> }
) {
  const { subtaskId } = await context.params;
  await prisma.subtask.delete({
    where: { id: subtaskId },
  });
  return NextResponse.json({ success: true });
}
