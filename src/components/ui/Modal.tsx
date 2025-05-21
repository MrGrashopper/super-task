"use client";

import React, { ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ open, onClose, children }: Props) =>
  !open ? null : (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0" />
      <div className="relative">{children}</div>
    </div>
  );
