import { useEffect, useRef, useState } from "react";

export const useMediaStream = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const isStreamSet = useRef(false);
  const [online, setOnline] = useState(true);

  const onMediaStream = async () => {
    const streamData = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(streamData);
  };

  useEffect(() => {
    if (isStreamSet.current) return;
    isStreamSet.current = true;

    try {
      onMediaStream();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const toggleTrack = (type: "video" | "audio") => {
    const value = !online;
    setOnline(value);
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack && !value) {
        videoTrack.stop();
      } else {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          setStream(stream);
        });
      }
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      setScreenStream(screenStream);
    } catch (error) {
      console.error("Error al compartir pantalla:", error);
    }
  };

  const stopScreenShare = () => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
    }
  };
  return { stream, toggleTrack, stopStream, startScreenShare, stopScreenShare };
};
