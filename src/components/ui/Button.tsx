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
      disabled,
      ...props
    },
    ref
  ) => {
    const base = "transition";
    const cursor = disabled ? "cursor-not-allowed" : "cursor-pointer";
    const size = variant === "icon" ? "p-2" : "px-4 md:px-6 py-2";
    const style =
      variant === "primary"
        ? disabled
          ? "border border-gray-300 text-gray-300 bg-gray-100 rounded-full"
          : "border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white rounded-full"
        : variant === "abort"
        ? "text-gray-400 hover:text-red-700 rounded-full"
        : variant === "ghost"
        ? "text-gray-400 hover:text-gray-700 rounded-full"
        : variant === "icon"
        ? `text-gray-400 ${
            isLightBgHover ? "hover:bg-gray-100" : "hover:bg-gray-200"
          } rounded-full`
        : "text-gray-400 hover:bg-gray-100 rounded-full";

    const button = (
      <button
        ref={ref}
        type={type}
        form={form}
        disabled={disabled}
        className={`${base} ${cursor} ${size} ${style} ${className}`}
        {...props}
        aria-label={tooltip ? tooltip.toString() : children?.toString()}
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
