import { useState } from "react";
import { UserList } from "../type";
import { useSocketStore } from "@/socket";
import { usePeer } from "./use-peer";
import { useRouter } from "next/navigation";

interface PlayerProp {
  myId: string;
  roomId: string;
}

export const usePlayers = ({ myId, roomId }: PlayerProp) => {
  const { socket } = useSocketStore((state) => state);
  const [clients, setClients] = useState<UserList>({});
  const { peer } = usePeer({ roomId });
  const { push } = useRouter();

  const toggleTrack = (type: "video" | "audio") => {
    const client = clients[myId];
    console.log(client);
    if (client) {
      type === "video"
        ? (client.playing = !client.playing)
        : (client.muted = !client.muted);

      const updateList = { ...clients, [myId]: client };
      setClients(updateList);
      socket?.emit("toggle-track", myId, roomId, type);
    }
  };

  const userConnected = (userID: any) => {
    socket?.emit("user-leave", myId, roomId);
    peer?.disconnect();
    push("/");
  };

  return {
    clients,
    setClients,
    toggleTrack,
    userConnected,
  };
};
