"use client";

import { useEffect } from "react";
import { ErrorState } from "@components/ui";

type Props = {
  error: Error;
  reset: () => void;
};

const ErrorBoundary = ({ error, reset }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorState text="Fehler beim Laden der Projekte." onRetry={reset} />;
};

export default ErrorBoundary;
