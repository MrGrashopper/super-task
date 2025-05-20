"use client";

import React from "react";

type UIButtonProps = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  children: React.ReactNode;
};

export const UIButton = ({
  type = "button",
  onClick,
  variant = "primary",
  children,
}: UIButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    className={`cursor-pointer px-6 py-2 rounded-full transition ${
      variant === "primary"
        ? "border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white"
        : "text-gray-700 hover:text-red-700"
    }`}
  >
    {children}
  </button>
);
