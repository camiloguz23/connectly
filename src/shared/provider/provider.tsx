"use client";

import React from "react";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

export function Provider({ children }: Props) {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: "#000",
          },
        }}
      />
      {children}
    </>
  );
}
