"use client";

import ReactPlayer from "react-player";
import { IconUser } from "../icons";

interface PlayerVideoProps {
  playerId: string;
  url: any;
  muted?: boolean;
  playing?: boolean;
}
export function PlayerVideo({
  playerId,
  url,
  muted,
  playing,
}: PlayerVideoProps) {
  return (
    <div>
      {typeof window !== "undefined" &&
        (playing ? (
          <ReactPlayer
            key={playerId}
            url={url}
            muted={muted}
            playing={playing}
            style={{ borderRadius: "10px" }}
            width={"300px"}
            height={"300px"}
          />
        ) : (
          <IconUser size="300px" />
        ))}
    </div>
  );
}
