"use client";

import ReactPlayer from "react-player";
import { IconUser } from "../icons";
import style from "./player.module.css";

interface PlayerVideoProps {
  playerId: string;
  url: any;
  muted?: boolean;
  playing?: boolean;
  length: number;
  isMain?: boolean;
  list?: boolean;
}
export function PlayerVideo({
  playerId,
  url,
  muted,
  playing,
  isMain,
  length,
  list,
}: PlayerVideoProps) {
  const setStyle = () => {
    if (length === 1) {
      return `${style["content-video"]} ${style["onlyUser"]}`;
    }

    if (length > 1 && isMain) {
      return `${style["content-video"]} ${style["onlyAdmin"]}`;
    }

    if (length === 2 && list) {
      return `${style["content-video"]} ${style["onlyList"]}`;
    }

    return style["content-video"];
  };

  return (
    <div className={setStyle()}>
      {typeof window !== "undefined" &&
        (playing ? (
          <ReactPlayer
            key={playerId}
            url={url}
            muted={muted}
            playing={playing}
            width="100%"
            height="100%"
          />
        ) : (
          <IconUser size="90%" />
        ))}
    </div>
  );
}
