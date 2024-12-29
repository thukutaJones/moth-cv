"use client";

import Message from "@/components/Message";
import { baseUrl } from "@/constants/baseUrl";
import axios from "axios";
import React, { useState, useEffect, use, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import prompts from "@/constants/prompts";
import Recorder from "@/components/Recorder";
import { useFormState } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { getUserIdFromCookie } from "@/constants/getUserId";

interface IMessage {
  role: string;
  content: string;
}

const mimeType = "audio/webm";

const Mock = () => {
  const jobTitle = usePathname()?.split("/")[2]
  const [conversation, setConversation] = useState<IMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPrompting, setIsPrompting] = useState<boolean>(false);
  const [interviewId, setInterviewId] = useState<string>("");
  const [endIntreviewToggle, setEndInterviewToggle] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

  const router = useRouter();

  const promptAi = async (prompt: string) => {
    try {
      setIsProcessing(true);
      const activeAudio = new Audio("/active.mp3");
      activeAudio.play();
      setIsPrompting(true);
      const userId = await getUserIdFromCookie()
      const res = await axios.post(
        `${baseUrl}/api/prompt/${userId}`,
        { prompt }
      );

      if ("speechSynthesis" in window) {
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(res?.data?.message);
        utterance.pitch = 1.2;
        utterance.rate = 1;
        utterance.volume = 1;
        utterance.lang = "en-US";

        utterance.onstart = () => {
          setIsProcessing(false);
          setIsSpeaking(true);
        };
        utterance.onend = () => {
          setIsSpeaking(false);
          const notActiveAudio = new Audio("/notactive.mp3");
          notActiveAudio.play();
        };

        speechSynthesis.speak(utterance);
      } else {
        alert("Text-to-Speech is not supported in this browser.");
      }

      setConversation((prev) => [
        ...prev,
        { role: "system", content: res?.data?.message },
      ]);
      setInterviewId(res?.data?.interviewId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPrompting(false);
    }
  };

  const uploadAudio = async (blob: Blob) => {
    setIsProcessing(true);
    const mimeType = "audio/webm";
    const file = new File([blob], "audio.webm", { type: mimeType });

    if (fileRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileRef.current.files = dataTransfer.files;

      if (submitButtonRef.current) {
        submitButtonRef.current?.click();
      }
    }
    const formData = new FormData();
    formData.append("audio", file);

    try {
      const userId = await getUserIdFromCookie()
      const res = await axios.post(
        `${baseUrl}/interview/respond/${userId}/${interviewId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setConversation(res?.data?.message);

      if ("speechSynthesis" in window) {
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(
          res?.data?.message[res?.data?.message?.length - 1]?.content
        );
        utterance.pitch = 1.2;
        utterance.rate = 1;
        utterance.volume = 1;
        utterance.lang = "en-US";

        utterance.onstart = () => {
          setIsProcessing(false);
          setIsSpeaking(true);
        };
        utterance.onend = () => {
          setIsSpeaking(false);
          const notActiveAudio = new Audio("/notactive.mp3");
          notActiveAudio.play();
        };

        speechSynthesis.speak(utterance);
      } else {
        alert("Text-to-Speech is not supported in this browser.");
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full md:w-[60%] h-full">
        <div
          className="mt-[2%] w-full h-[85%] overflow-y-auto p-4 flex flex-col gap-4 scroll-container"
          ref={scrollRef}
        >
          {conversation.map((item, index) => (
            <Message data={item} key={index} />
          ))}
          {!conversation?.length && !isProcessing && (
            <div className="w-full h-full flex items-center justify-center px-8 md:px-16">
              <p className="text-2xl font-sans text-black text-center font-bold animate-bounce">
                Hello 👋, Welcome to the mock interview. To Start the interview
                press the <span className="text-green-500">play button</span>{" "}
                below
              </p>
            </div>
          )}
        </div>
        <form className="h-[10%] w-full flex gap-4 items-center justify-center bg-transparent">
          <div
            className="h-12 w-12 rounded-full bg-green-500 hover:scale-110 flex items-center justify-center"
            onClick={async () => {
              if (!conversation?.length) {
                const prompt = prompts(jobTitle)?.reporte;
                await promptAi(prompt);
              }
            }}
          >
            {isPrompting || isSpeaking ? (
              <div className="w-6 h-6 border-t-2 border-r-2 border-white rounded-full animate-spin" />
            ) : !conversation?.length ? (
              <FaPlay size={25} color="white" />
            ) : (
              <Recorder uploadAudio={uploadAudio} />
            )}
          </div>
          {conversation?.length && (
            <div
              className="border border-red-600 px-6 py-1 rounded-xl cursor-pointer hover:scale-105"
              onClick={() => setEndInterviewToggle(true)}
            >
              <p className="text-red-600 text-sm">end</p>
            </div>
          )}
        </form>
        {endIntreviewToggle && (
          <div className="absolute top-0 left-0 bg-white bg-opacity-70 w-full h-full z-40 flex items-center justify-center">
            <div className="w-[90%] md:w-[40%] p-6 bg-white shadow-lg rounded-lg">
              <p className="text-xl font-bold text-black font-sans">
                End the interview ?
              </p>
              <div className="mt-8 w-full flex gap-4 justify-end items-center">
                <div
                  className="px-5 border border-blue-600 rounded-full py-1 text-blue-600 cursor-pointer hover:scale-105"
                  onClick={() => router.replace("/mock-interview")}
                >
                  yes
                </div>
                <div
                  className="px-4 bg-blue-600 text-white py-1 rounded-full cursor-pointer hover:scale-105"
                  onClick={() => setEndInterviewToggle(false)}
                >
                  cancel
                </div>
              </div>
            </div>
          </div>
        )}
        {isProcessing && (
          <div className="absolute top-0 left-0 bg-opacity-70 w-full h-[90px] z-40 flex flex-col items-center justify-end">
            <div className="flex gap-2">
              <p className="text-blue-600">processing</p>
              <div className="w-5 h-5 border-t-2 border-r-2 border-blue-600 rounded-full animate-spin" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mock;
