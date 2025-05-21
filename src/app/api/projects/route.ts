import { ProjectDto } from "@lib/dto";
import { prisma } from "@lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const raw = await prisma.project.findMany({
    include: { tasks: { include: { subtasks: true } } },
  });
  const data = ProjectDto.array().parse(raw);
  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  const body = await req.json();
  return NextResponse.json(await prisma.project.create({ data: body }));
};
