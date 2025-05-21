"use client";
import { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Status } from "@lib/types";

type Props = { id: string; status: Status; children: ReactNode };

export const SortableTask = ({ id, status, children }: Props) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id,
      data: { status },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "block",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};
