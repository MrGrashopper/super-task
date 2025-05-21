import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { tasks: { include: { subtasks: true } } },
  });
  return NextResponse.json(project);
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const data = await req.json();
  const updated = await prisma.project.update({
    where: { id },
    data,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
