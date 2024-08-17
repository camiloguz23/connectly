"use client";

import { useEffect } from "react";
import { useSocketStore } from "./socket";
import { usePeer } from "@/shared";

interface SocketProviderProps {
  children: React.ReactNode;
}

export function ProviderSocket({ children }: SocketProviderProps) {
  const { connectSocket, disconnectSocket } = useSocketStore((state) => state);
  useEffect(() => {
    console.log("provider socket");
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, []);

  return <>{children}</>;
}
