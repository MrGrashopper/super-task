"use client";

import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { Tooltip } from "./Tooltip";

export type UIButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "abort" | "icon" | "ghost";
  tooltip?: ReactNode;
  isLightBgHover?: boolean;
};

export const UIButton = forwardRef<HTMLButtonElement, UIButtonProps>(
  (
    {
      variant = "primary",
      className = "",
      children,
      tooltip,
      type = "button",
      form,
      isLightBgHover,
      ...props
    },
    ref
  ) => {
    const base = "cursor-pointer transition";
    const size = variant === "icon" ? "p-2" : "px-4 md:px-6 py-2";
    const style =
      variant === "primary"
        ? "border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white rounded-full"
        : variant === "abort"
        ? "text-gray-400 hover:text-red-700 rounded-full"
        : variant === "ghost"
        ? "text-gray-400 hover:text-gray-700 rounded-full"
        : variant === "icon"
        ? `text-gray-400 ${
            isLightBgHover ? " hover:bg-gray-100" : "hover:bg-gray-200"
          } rounded-full`
        : "text-gray-400 hover:bg-gray-100 rounded-full";

    const button = (
      <button
        ref={ref}
        type={type}
        form={form}
        className={`${base} ${size} ${style} ${className}`}
        {...props}
      >
        {children}
      </button>
    );

    if (!tooltip) return button;

    return (
      <div className="relative inline-block group">
        {button}
        <Tooltip>{tooltip}</Tooltip>
      </div>
    );
  }
);

UIButton.displayName = "UIButton";
