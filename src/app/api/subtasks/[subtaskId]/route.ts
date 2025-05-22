import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { subtaskId: string } }
) {
  const data = await req.json();
  const updated = await prisma.subtask.update({
    where: { id: params.subtaskId },
    data: {
      ...data,
      ...(data.dueDate && { dueDate: new Date(data.dueDate) }),
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { subtaskId: string } }
) {
  await prisma.subtask.delete({ where: { id: params.subtaskId } });
  return NextResponse.json({ ok: true });
}
