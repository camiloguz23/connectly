import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface SocketStore {
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  connectSocket: () => {
    const socketInstance = io(process.env.NEXT_PUBLIC_URL_SOCKET as string);
    //socket-stream-kappa.vercel.app/
    https: set({ socket: socketInstance });
  },
  disconnectSocket: () => {
    set((state) => {
      state.socket?.disconnect();
      return { socket: null };
    });
  },
}));
