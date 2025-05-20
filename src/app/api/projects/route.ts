import { prisma } from "@/lib/prisma";
import type { ProjectWithTasks } from "@/lib/types.server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const data: ProjectWithTasks[] = await prisma.project.findMany({
    include: { tasks: { include: { subtasks: true } } },
  });
  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  const body = await req.json();
  return NextResponse.json(await prisma.project.create({ data: body }));
};
