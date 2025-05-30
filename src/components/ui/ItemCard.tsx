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
  editable?: boolean;
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
  editable = false,
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

      <p
        className={`my-2 ${
          description ? "text-gray-600" : "text-gray-400"
        } truncate mr-12`}
        style={noWrapStyle}
      >
        {description || "..."}
      </p>

      {children}
    </>
  );

  const containerClasses =
    "block border border-gray-200 p-4 rounded-lg transition hover:border-gray-300 hover:bg-gray-50 min-h-34";

  return (
    <div className="p-2 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          Fälligkeitsdatum:{" "}
          {new Date(dueDate).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
        <div className="flex">
          {editable && (
            <UIButton
              variant="icon"
              aria-label="Bearbeiten"
              tooltip="Bearbeiten"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="group text-gray-400 hover:text-gray-600 transition"
              isLightBgHover
            >
              <Edit2
                size={18}
                className="transition group-hover:text-gray-600"
              />
            </UIButton>
          )}
          <UIButton
            variant="icon"
            aria-label="Löschen"
            tooltip="Löschen"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="group text-gray-400 hover:text-red-600 transition"
            isLightBgHover
          >
            <Trash2 size={18} className="transition group-hover:text-red-600" />
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
