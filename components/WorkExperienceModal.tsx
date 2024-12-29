"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import FormField from "./FormField";
import { SiGooglegemini } from "react-icons/si";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";
import { getUserIdFromCookie } from "@/constants/getUserId";

interface FormValues {
  jobTitle: string;
  startDate: any;
  endDate: any;
  jobDescription: string;
  companyName: string;
}

const WorkExperienceModal = ({
  handleClose,
  callBack,
  experience,
}: {
  handleClose: () => void;
  callBack: () => Promise<void>;
  experience?: any;
}) => {
  const [formValues, setFormValues] = useState<FormValues>({
    jobTitle: experience?.jobTitle || "",
    startDate: experience?.startDate ? new Date(experience?.startDate)?.toISOString()?.split("T")[0] : "",
    endDate: experience?.startDate ? new Date(experience?.endDate)?.toISOString()?.split("T")[0] : "",
    jobDescription: experience?.jobDescription || "• ",
    companyName: experience?.companyName || "",
  });
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const [isGettingDescription, setIsGettingDescription] =
    useState<boolean>(false);

  const handleAddWorkExperience = async (e: any) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const userId = await getUserIdFromCookie()
      const payload = { ...formValues, owner: userId };
      await axios.post(
        `${baseUrl}/api/cv-details/work-experience/${userId}`,
        payload
      );
      await callBack();
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleGetJobDescription = async () => {
    try {
      setIsGettingDescription(true);
      setFormError("");
      if (!formValues.jobTitle) {
        setFormError("Please fill the Job title to generate description");
        return;
      }

      const res = await axios.post(`${baseUrl}/api/prompt/get/jobdescription`, {
        jobTitle: formValues.jobTitle,
      });
      setFormValues({ ...formValues, jobDescription: res.data?.description });
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    } finally {
      setIsGettingDescription(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const cursorPosition = e.currentTarget.selectionStart;
      const beforeCursor = formValues.jobDescription.slice(0, cursorPosition);
      const afterCursor = formValues.jobDescription.slice(cursorPosition);
      setFormValues({
        ...formValues,
        jobDescription: `${beforeCursor}\n• ${afterCursor}`,
      });
      setTimeout(() => {
        const textarea = e.target as HTMLTextAreaElement;
        textarea.selectionStart = textarea.selectionEnd = cursorPosition + 3;
      }, 0);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white z-30 bg-opacity-90 flex items-center justify-center px-4">
      <div className="w-full md:w-[40%] bg-white p-8 shadow-lg rounded-lg max-h-[94%] overflow-y-auto scroll-container">
        <div className="w-full flex justify-between">
          <p className="text-blue-600 font-bold font-sans">
            Add work experience
          </p>
          <div
            className="bg-blue-600 p-1 rounded-full cursor-pointer"
            onClick={handleClose}
          >
            <IoClose size={20} />
          </div>
        </div>
        {formError && (
          <p className="px-4 bg-red-600 mt-2 py-1 text-sm font-sans rounded-md">
            {formError}
          </p>
        )}
        <form onSubmit={handleAddWorkExperience}>
          <FormField
            wid="w-full mt-4"
            title="Job Title"
            placeholder="Sales assistant"
            value={formValues?.jobTitle}
            handleChangeText={(event: any) =>
              setFormValues({
                ...formValues,
                jobTitle: event.target.value,
              })
            }
          />
          <FormField
            wid="w-full mt-2"
            title="Company Name"
            placeholder="DAPP Malawi"
            value={formValues?.companyName}
            handleChangeText={(event: any) =>
              setFormValues({
                ...formValues,
                companyName: event.target.value,
              })
            }
          />
          <FormField
            wid="w-full mt-4"
            title="Start Date"
            type="Date"
            placeholder="2020-01-01"
            value={formValues?.startDate}
            handleChangeText={(event: any) =>
              setFormValues({
                ...formValues,
                startDate: event.target.value,
              })
            }
          />
          <FormField
            wid="w-full mt-4"
            title="End Date"
            placeholder="2020-01-01"
            type="Date"
            value={formValues?.endDate}
            handleChangeText={(event: any) =>
              setFormValues({
                ...formValues,
                endDate: event.target.value,
              })
            }
          />
          <div className="flex justify-between w-full items-center mt-2">
            <label className="text-xs font-sans font-bold text-black">
              Description
            </label>
            <div
              className="flex gap-1 px-4 py-1 bg-blue-600 rounded-full items-center cursor-pointer"
              onClick={handleGetJobDescription}
            >
              <p className="text-xs">{isGettingDescription ? 'Generating ' : 'Auto generate'}</p>
              {isGettingDescription ? (
                <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin" />
              ) : (
                <SiGooglegemini size={20} color="white" />
              )}
            </div>
          </div>
          <textarea
            id="multiline-input"
            rows={5}
            cols={50}
            value={formValues.jobDescription}
            onChange={(e) =>
              setFormValues({ ...formValues, jobDescription: e.target.value })
            }
            onKeyDown={handleKeyDown}
            className="w-full h-28 scroll-container bg-transparent border border-gray-300 focus:border-blue-600 outline-none focus:outline-none px-4 text-sm text-gray-600 mt-2"
          />
          <button
            className="mt-6 w-full bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center"
            type="submit"
            disabled={isAdding}
          >
            {isAdding ? (
              <div className="w-6 h-6 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
            ) : (
              <p className="text-sm font-bold font-sans">Add experience</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkExperienceModal;
