import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

export async function PATCH(req: Request) {
  const { newOrder }: { newOrder: { id: string; order: number }[] } =
    await req.json();

  await prisma.$transaction(
    newOrder.map(({ id, order }) =>
      prisma.task.update({
        where: { id },
        data: { order },
      })
    )
  );

  return NextResponse.json({ success: true });
}
