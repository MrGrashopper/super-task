"use client";

import React, { ReactNode } from "react";

type TooltipProps = {
  children: ReactNode;
};

export const Tooltip = ({ children }: TooltipProps) => (
  <div
    className="
      pointer-events-none
      absolute bottom-full mb-2
      left-1/2 transform -translate-x-1/2
      whitespace-nowrap bg-gray-800 text-white text-xs rounded py-1 px-2
      opacity-0 group-hover:opacity-100 transition-opacity
    "
  >
    {children}
  </div>
);
