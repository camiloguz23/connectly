"use client";

import { useMediaStream, usePeer } from "@/shared";
import { PlayerVideo } from "@/shared/components";
import { useSocketStore } from "@/socket";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import style from "./player.module.css";

export default function PageRoom() {
  const params = useParams<{ id: string }>();
  const { socket } = useSocketStore((state) => state);
  const { myID, peer } = usePeer({ roomId: params?.id ?? "" });
  const { stream, toggleTrack } = useMediaStream();
  const [clients, setClients] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (!myID) return;
    setClients((prev) => ({
      ...prev,
      [myID]: {
        url: stream,
        muted: true,
        playing: true,
        type: "main",
      },
    }));
  }, [myID]);

  useEffect(() => {
    if (!socket || !stream || !peer) return;
    const userConnected = (userID: any) => {
      const call = peer.call(userID, stream);
      call.on("stream", (incommingStream) => {
        setClients((prev) => ({
          ...prev,
          [userID]: {
            url: stream,
            muted: true,
            playing: true,
            rol: "admin",
            type: "main",
          },
        }));
      });
    };
    socket.on("user-connected", userConnected);
    return () => {
      socket.off("user-connected", userConnected);
    };
  }, [socket, peer, stream]);

  useEffect(() => {
    if (!peer || !stream) return;
    peer.on("call", (call) => {
      const { peer: callID } = call;
      call.answer(stream);
      call.on("stream", (incommingStream) => {
        setClients((prev) => ({
          ...prev,
          [callID]: {
            url: stream,
            muted: true,
            playing: true,
            rol: "client",
            type: "visit",
          },
        }));
      });
    });
  }, [peer, stream]);

  return (
    <div className={style.contentMain}>
      PageRoom id {"->"}
      {params.id} userID {"->"} {myID}
      <p>
        ----------------------------------------------------------------------------
      </p>
      <div className={style["content-player"]}>
        <div className={style.player}>
          {Object.keys(clients).map((key) => {
            const { url, muted, playing } = clients[key];
            return (
              <PlayerVideo
                key={key}
                playerId={key}
                url={url}
                muted={muted}
                playing={playing}
              />
            );
          })}
        </div>
        <div className={style.actionBtn}>
          <p>action</p>
          <button onClick={() => toggleTrack("video")}>
            camara off
          </button>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useMediaStream, usePeer } from "@/shared";
// import { PlayerVideo } from "@/shared/components";
// import { useSocketStore } from "@/socket";
// import { useParams } from "next/navigation";
// import { useEffect, useRef } from "react";

// export default function PageRoom() {
//   const params = useParams<{ id: string }>();
//   const { socket } = useSocketStore((state) => state);
//   const { myID, peer } = usePeer();
//   const { stream } = useMediaStream();
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   useEffect(() => {
//     if (videoRef.current && stream) {
//       videoRef.current.srcObject = stream;
//     }
//   }, [stream]);
//   return (
//     <div>
//       PageRoom id {"->"}
//       {params.id}
//       <video ref={videoRef} autoPlay/>
//     </div>
//   );
// }
