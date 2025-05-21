import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await context.params;
  const data = await req.json();
  const updated = await prisma.task.update({
    where: { id: taskId },
    data,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await context.params;
  await prisma.task.delete({ where: { id: taskId } });
  return NextResponse.json({ success: true });
}
