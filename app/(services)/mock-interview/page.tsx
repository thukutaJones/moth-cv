"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const MockInterview = () => {
  const [formValues, setFormValues] = useState({
    jobTitle: "",
    jobDescription: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();

  const handleStartInterview = async (e: any) => {
    try {
      setIsSubmitting(true);
      e.preventDefault();
      router.push(`/mock-interview/${formValues.jobTitle.replace(" ", "-")}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full h-full relative">
      <Image
        src="/interview.jpg"
        width={1000}
        height={1000}
        alt="bg"
        className="w-full h-[calc(100vh-80px)]"
      />
      <div className="absolute top-0 left-0 bg-white bg-opacity-95 h-full w-full flex items-center justify-center">
        <div className="w-[90%] md:w-[35%] p-4 bg-white shadow-xl rounded-lg bg-opacity-90 flex flex-col items-center justify-end">
          <p className="text-center w-[70%] text-xl font-bold font-sans text-gray-500">
            Hey 👋, Let's help you prepare for your interview
          </p>
          <p className="text-xs font-sans text-gray-600">
            "Boost your confidence, perfect your answers, and ace every
            interview"
          </p>
          <form className="w-full mt-8" onSubmit={handleStartInterview}>
            <div className="w-full flex flex-col">
              <label className="text-sm font-bold font-sans text-gray-500">
                Job title
              </label>
              <input
                className="bg-white shadow-sm h-10 rounded-lg outline-none focus:outline-none px-4 text-gray-600 font-sans text-sm"
                placeholder="Sales assistant"
                required
                value={formValues.jobTitle}
                onChange={(e) =>
                  setFormValues({ ...formValues, jobTitle: e.target.value })
                }
              />
              {/* <label className="text-sm font-bold font-sans text-gray-500 mt-4">
                Job Description (optional)
              </label>
              <textarea
                id="multiline-input"
                rows={5}
                cols={50}
                value={formValues.jobDescription}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    jobDescription: e.target.value,
                  })
                }
                className="w-full h-40 bg-transparent bg-white shadow-sm outline-none focus:outline-none px-4 py-2 text-sm text-gray-600 mt-2"
              /> */}
            </div>
            <button
              className="mt-16 w-full bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center hover:scale-105"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
              ) : (
                <p className="text-sm font-bold font-sans">Start interview</p>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MockInterview;
