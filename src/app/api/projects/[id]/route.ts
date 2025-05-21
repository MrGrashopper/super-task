import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

export const GET = async (
  _req: Request,
  { params }: { params: { id: string } }
) =>
  NextResponse.json(
    await prisma.project.findUnique({
      where: { id: params.id },
      include: { tasks: { include: { subtasks: true } } },
    })
  );

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const data = await req.json();
  return NextResponse.json(
    await prisma.project.update({ where: { id: params.id }, data })
  );
};

export const DELETE = async (
  _: Request,
  { params }: { params: { id: string } }
) =>
  NextResponse.json(await prisma.project.delete({ where: { id: params.id } }));
