import React from "react";
import { getStatusClass, StatusLabels } from "@lib/constants";
import type { Status } from "@lib/types";
import { ChevronDown } from "lucide-react";
import { Tooltip } from "@components/ui";

export type StatusBadgeVariant = "default" | "small";

type Props = {
  status: Status;
  variant?: StatusBadgeVariant;
  editable?: boolean;
  onChange?: (newStatus: Status) => void;
  className?: string;
};

export const StatusBadge: React.FC<Props> = ({
  status,
  variant = "default",
  editable = false,
  onChange,
  className = "",
}) => {
  const bgTextClasses = getStatusClass(status);
  const sizeClasses = {
    default: "px-2 py-1 text-sm",
    small: "px-2 py-0.5 text-xs",
  }[variant];

  if (editable && onChange) {
    return (
      <div
        className={`relative inline-block group ${sizeClasses} rounded ${bgTextClasses} ${className}`}
      >
        <select
          value={status}
          onChange={(e) => onChange(e.target.value as Status)}
          className="w-full bg-transparent border-none appearance-none pl-2 pr-8 cursor-pointer focus:outline-none focus:ring-0"
        >
          {(Object.keys(StatusLabels) as Status[]).map((s) => (
            <option key={s} value={s}>
              {StatusLabels[s]}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-current"
        />
        <Tooltip>Status ändern</Tooltip>
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses} inline-block rounded ${bgTextClasses} ${className}`}
    >
      {StatusLabels[status]}
    </div>
  );
};
