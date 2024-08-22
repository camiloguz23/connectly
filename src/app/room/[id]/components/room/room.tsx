"use client";

import {
  IconSettings,
  useMediaStream,
  usePeer,
  UserInfo,
  UserList,
} from "@/shared";
import { IconWebCam, PlayerVideo, IconMicrofono, IconUser } from "@/shared";
import { useSocketStore } from "@/socket";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import style from "./player.module.css";
import { useBoolean, usePlayers } from "@/shared/hooks";
import IconCallEnd from "@/shared/components/icons/icon-call-end";

export function PageRoom() {
  const params = useParams<{ id: string }>();
  const { socket } = useSocketStore((state) => state);
  const { myID, peer } = usePeer({ roomId: params?.id ?? "" });
  const {
    stream,
    stopStream,
    devices,
  } = useMediaStream();
  const { clients, setClients, toggleTrack, userConnected } = usePlayers({
    myId: myID,
    roomId: params?.id,
  });
  const { value, toggle } = useBoolean();

  useEffect(() => {
    socket?.on("updateList", (userId, type) => {
      const stateCam =
        type === "video" ? !clients[userId]?.playing : !clients[userId]?.muted;

      const infoUser: UserInfo =
        type === "video"
          ? { ...clients[userId], playing: stateCam }
          : { ...clients[userId], muted: stateCam };
      const updateList: UserList = {
        ...clients,
        [userId]: infoUser,
      };
      setClients(updateList);
    });

    socket?.on("userDelete", (userId) => {
      const useDelete = { ...clients };
      delete useDelete[userId];
      setClients(useDelete);
    });
  }, [clients, setClients, socket]);

  useEffect(() => {
    if (!myID) return;
    console.log("aqui");
    setClients((prev) => ({
      ...prev,
      [myID]: {
        url: stream,
        muted: true,
        playing: true,
        type: "main",
        rol: "admin",
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
            type: "visited",
            rol: "user",
          },
        }));
      });
    });
  }, [peer, stream]);

  return (
    <div className={style.contentMain}>
      <div className={style["content-player"]}>
        <div className={style.player}>
          {clients[myID] ? (
            <PlayerVideo
              playerId={myID}
              url={clients[myID].url}
              muted={clients[myID].muted}
              playing={clients[myID].playing}
              isMain={clients[myID].type === "main"}
              length={Object.keys(clients).length}
            />
          ) : (
            <IconUser size="30%" />
          )}

          {Object.keys(clients)
            .filter((item) => item !== myID)
            .map((key) => {
              const { url, muted, playing } = clients[key];
              return (
                <PlayerVideo
                  key={key}
                  playerId={key}
                  url={url}
                  muted={muted}
                  playing={playing}
                  length={Object.keys(clients).length}
                  list={true}
                />
              );
            })}
          {value && (
            <div className={style.menuDevice}>
              <h3>Dispositivos de audio</h3>
              {devices?.audioinput.map((device) => (
                <p key={device.deviceId}>{device.label}</p>
              ))}
              <h3>Dispositivos de video</h3>
              {devices?.videoinput.map((device) => (
                <p key={device.deviceId}>{device.label}</p>
              ))}
            </div>
          )}
        </div>
        <div className={style.actionBtn}>
          <button
            onClick={() => {
              toggleTrack("video");
            }}
            className={`${style.btn} ${
              clients[myID]?.playing ? style.active : ""
            }`}
          >
            <IconWebCam on={clients[myID]?.playing} />
          </button>
          <button
            onClick={() => toggleTrack("audio")}
            className={`${style.btn} ${
              clients[myID]?.muted ? "" : style.active
            }`}
          >
            <IconMicrofono off={clients[myID]?.muted} />
          </button>
          <button
            onClick={() => {
              stopStream();
              userConnected(myID);
            }}
            className={`${style.btn} ${style.delete}`}
          >
            <IconCallEnd />
          </button>
          <button
            onClick={() => {
              toggle();
            }}
            className={`${style.btn}`}
          >
            <IconSettings />
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
