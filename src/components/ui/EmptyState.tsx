"use client";

import React from "react";
import { UIButton } from "./Button";

type EmptyStateProps = {
  title: string;
  description: string;
  buttonLabel: string;
  onButtonClick: () => void;
};

export const EmptyState = ({
  title,
  description,
  buttonLabel,
  onButtonClick,
}: EmptyStateProps) => (
  <main className="flex flex-col items-center justify-center h-screen p-6">
    <h1 className="font-main text-6xl font-bold mb-4">{title}</h1>
    <p className="text-gray-600 mb-6 text-center max-w-sm">{description}</p>
    <UIButton onClick={onButtonClick}>{buttonLabel}</UIButton>
  </main>
);
