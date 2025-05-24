import React from "react";

export const ErrorState = ({ text }: { text: string }) => (
  <div className="p-4 text-red-600">{text}</div>
);
