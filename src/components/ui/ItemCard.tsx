"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";

type Props = {
  title: string;
  description?: string;
  dueDate: string;
  statusBadge: ReactNode;
  onDelete: () => void;
  href?: string;
  children?: ReactNode;
};

export const ItemCard = ({
  title,
  description,
  dueDate,
  statusBadge,
  onDelete,
  href,
  children,
}: Props) => {
  const content = (
    <>
      <h2 className="text-2xl font-semibold text-gray-600">{title}</h2>
      {description && <p className="mt-2 text-gray-600">{description}</p>}
      <div className="mt-3">{statusBadge}</div>
      {children}
    </>
  );

  const containerClasses =
    "block border border-gray-200 p-4 rounded-lg transition" +
    (href ? " hover:bg-gray-50" : "");

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">
          Fällig: {new Date(dueDate).toLocaleDateString("de-DE")}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-gray-400 hover:text-red-600 transition"
          aria-label="Löschen"
        >
          <Trash2 size={18} />
        </button>
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
