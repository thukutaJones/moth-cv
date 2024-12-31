"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import FormField from "./FormField";
import { SiGooglegemini } from "react-icons/si";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";

const EnterJobTitle = ({
  handleClose,
  callBack,
}: {
  handleClose: () => void;
  callBack: (text: string) => void;
}) => {
  const [jobTitle, setjobTitle] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAddjobTitle = async (e: any) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const payload = { jobTitle };
      const res = await axios.post(
        `${baseUrl}/api/cv-details/professional-summary/get/professional-summary`,
        payload
      );
      
      callBack(res.data.professionalSummary);
      handleClose();
    } catch (error) {
      alert(error)
      console.log(error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white z-30 bg-opacity-90 flex items-center justify-center px-4">
      <div className="w-full md:w-[40%] bg-white p-8 shadow-lg rounded-lg max-h-[88%] overflow-y-auto scroll-container">
        <div className="w-full flex justify-between">
          <p className="text-blue-600 font-bold font-sans">Generate professional summary</p>
          <div
            className="bg-blue-600 p-1 rounded-full cursor-pointer"
            onClick={handleClose}
          >
            <IoClose size={20} />
          </div>
        </div>
        <form onSubmit={handleAddjobTitle}>
          <FormField
            wid="w-full mt-2"
            title="Job title"
            placeholder="Sales assistant"
            value={jobTitle}
            handleChangeText={(event: any) => setjobTitle(event.target.value)}
          />

          <button
            className="mt-6 w-full bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center"
            type="submit"
            disabled={isAdding}
          >
            {isAdding ? (
              <div className="w-6 h-6 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
            ) : (
              <p className="text-sm font-bold font-sans">Generate</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnterJobTitle;
