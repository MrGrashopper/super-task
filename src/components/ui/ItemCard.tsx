"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { Edit2, Trash2 } from "lucide-react";
import { UIButton } from "./Button";

type Props = {
  title: string;
  description?: string;
  dueDate: string;
  statusBadge: ReactNode;
  href?: string;
  children?: ReactNode;
  onDelete: () => void;
  onEdit?: () => void;
};

export const ItemCard = ({
  title,
  description,
  dueDate,
  statusBadge,
  href,
  children,
  onDelete,
  onEdit,
}: Props) => {
  const noWrapStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const content = (
    <>
      <div className="flex items-center justify-between">
        <h2
          className="text-lg font-semibold text-gray-600 mr-2"
          style={noWrapStyle}
        >
          {title}
        </h2>
        <div>{statusBadge}</div>
      </div>
      {description && (
        <p className="my-2 text-gray-600 truncate mr-12" style={noWrapStyle}>
          {description}
        </p>
      )}
      {children}
    </>
  );

  const containerClasses =
    "block border border-gray-200 p-4 rounded-lg transition hover:border-gray-300";

  return (
    <div className="p-2 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">
          Fällig: {new Date(dueDate).toLocaleDateString("de-DE")}
        </span>
        <div className="flex">
          <UIButton
            variant="icon"
            aria-label="Bearbeiten"
            tooltip="Bearbeiten"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <Edit2 size={18} />
          </UIButton>
          <UIButton
            variant="icon"
            aria-label="Löschen"
            tooltip="Löschen"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-gray-400 hover:text-red-600 transition"
          >
            <Trash2 size={18} />
          </UIButton>
        </div>
      </div>

      {href ? (
        <Link href={href} className={containerClasses}>
          {content}
        </Link>
      ) : (
        <div className={containerClasses}>{content}</div>
      )}
    </div>
  );
};
