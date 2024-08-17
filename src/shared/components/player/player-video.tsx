"use client";

import ReactPlayer from "react-player";

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
      {typeof window !== "undefined" && (
        <ReactPlayer
          key={playerId}
          url={url}
          muted={muted}
          playing={playing}
          style={{ borderRadius: "10px" }}
          width={"300px"}
          height={"300px"}
        />
      )}
    </div>
  );
}
