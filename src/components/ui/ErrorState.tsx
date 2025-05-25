import React from "react";

export const ErrorState = ({
  text,
  onRetry,
}: {
  text: string;
  onRetry?: () => void;
}) => (
  <div className="p-4 text-red-600 flex flex-col items-center">
    <p>{text}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
      >
        Erneut versuchen
      </button>
    )}
  </div>
);
