import { useSocketStore } from "@/socket";
import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";

interface PeerData {
  roomId?: string;
}
export const usePeer = ({ roomId }: PeerData) => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [myID, setMyID] = useState("");
  const { socket } = useSocketStore((state) => state);
  const isPeerSet = useRef(false);

  useEffect(() => {
    if (isPeerSet.current || !socket || !roomId) return;
    const peerInit = new Peer();
    setPeer(peerInit);
    isPeerSet.current = true;
    peerInit.on("open", (id) => {
      setMyID(id);
      socket.emit("join-room", id, roomId ?? "");
    });
  }, [roomId, socket]);

  return { peer, myID };
};
