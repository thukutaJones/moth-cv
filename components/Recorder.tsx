"use client";

import { useEffect, useRef, useState } from "react";
import { IoIosMic } from "react-icons/io";

const mimeType = "audio/webm";

function Recorder({ uploadAudio }: { uploadAudio: (blob: Blob) => void }) {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audio, setAudio] = useState<string | null>(null);

  useEffect(() => {
    getMicrophonePermission();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const getMicrophonePermission = async () => {
    if (!navigator?.mediaDevices?.getUserMedia) {
      alert("The MediaRecorder API is not supported in your browser.");
      return;
    }

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      setPermission(true);
      setStream(streamData);
    } catch (err: any) {
      alert(err.message || "Failed to access the microphone.");
    }
  };

  const startRecording = () => {
    if (!stream || !permission) {
      alert("Microphone permission is required to record audio.");
      return;
    }

    const activeAudio = new Audio("/active.mp3");
    activeAudio.play();

    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;

    let localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        localAudioChunks.push(event.data);
      }
    };

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(localAudioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      uploadAudio(audioBlob);
      setAudioChunks([]);
    };

    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      const notActiveAudio = new Audio("/notactive.mp3");
      notActiveAudio.play();

      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div onClick={!isRecording ? startRecording : stopRecording}>
      {!isRecording ? (
        <IoIosMic size={25} color="white" />
      ) : (
        <div className="w-6 h-6 border-t-2 border-r-2 border-white rounded-full animate-spin" />
      )}
    </div>
  );
}

export default Recorder;
