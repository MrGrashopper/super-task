"use client";

import React from "react";

type UIButtonProps = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "icon" | "ghost";
  children: React.ReactNode;
};

export const UIButton = ({
  type = "button",
  onClick,
  variant = "primary",
  children,
}: UIButtonProps) => {
  const base = "cursor-pointer transition";
  const size = variant === "icon" ? "p-2" : "px-2 md:px-6 py-2";
  const style =
    variant === "primary"
      ? "border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white rounded-full"
      : variant === "secondary"
      ? "text-gray-700 hover:text-red-700 rounded-full"
      : variant === "icon"
      ? "text-gray-700 hover:bg-gray-200 rounded-full"
      : /* ghost */ "text-gray-700 hover:bg-gray-100 rounded-full";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${size} ${style}`}
    >
      {children}
    </button>
  );
};
