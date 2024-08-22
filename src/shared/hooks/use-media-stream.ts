import { useEffect, useRef, useState } from "react";
import { TypeMediaStream } from "../type";

export const useMediaStream = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [devices, setDevices] = useState<TypeMediaStream>({
    audioinput: [],
    videoinput: [],
  });
  
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<
    string | null | undefined
  >(null);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<
    string | null | undefined
  >(null);
  const isStreamSet = useRef(false);
  const [online, setOnline] = useState(true);

  const onMediaStream = async (
    videoDeviceId?: string | null,
    audioDeviceId?: string | null
  ) => {
    const streamData = await navigator.mediaDevices.getUserMedia({
      video: videoDeviceId ? { deviceId: videoDeviceId } : true,
      audio: audioDeviceId ? { deviceId: audioDeviceId } : true,
    });
    setStream(streamData);
  };

  const getDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const deviceList = devices.filter(
      (device) => device.kind === "videoinput" || device.kind === "audioinput"
    );
    setDevices(
      Object.groupBy(deviceList, (item) => item.kind) as TypeMediaStream
    );
  };

  const handleDeviceChange = async () => {
    if (selectedVideoDevice || selectedAudioDevice) {
      await onMediaStream(selectedVideoDevice, selectedAudioDevice);
    }
  };

  useEffect(() => {
    if (isStreamSet.current) return;
    isStreamSet.current = true;

    try {
      onMediaStream();
      getDevices();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const toggleTrack = (type: "video" | "audio") => {
    const value = !online;
    setOnline(value);
    if (online) {
      const videoTrack = stream?.getVideoTracks()[0];
      videoTrack?.stop();
    } else {
      onMediaStream();
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
  return {
    stream,
    toggleTrack,
    stopStream,
    startScreenShare,
    stopScreenShare,
    handleDeviceChange,
    devices,
  };
};
