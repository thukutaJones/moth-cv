"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import FormField from "./FormField";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";
import { getUserId } from "@/constants/getUserId";

interface FormValues {
  degree: string;
  startDate: any;
  endDate: any;
  school: string;
}

const EducationModal = ({
  handleClose,
  callBack,
  education,
}: {
  handleClose: () => void;
  callBack: () => Promise<void>;
  education: any;
}) => {
  const [formValues, setFormValues] = useState<FormValues>({
    degree: education?.degree || "",
    startDate: education?.startDate
      ? new Date(education?.startDate).toISOString()?.split("T")[0]
      : "",
    endDate: education?.endDate
      ? new Date(education?.endDate).toISOString()?.split("T")[0]
      : "",
    school: education?.school || "",
  });
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAddEducation = async (e: any) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const token: string = localStorage.getItem("moth-cv-token") || "";
      const userId = await getUserId(token);
      const payload = { ...formValues, owner: userId };
      await axios.post(
        `${baseUrl}/api/cv-details/education/${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await callBack();
      handleClose();
    } catch (error) {
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white z-30 bg-opacity-90 flex items-center justify-center px-4">
      <div className="w-full md:w-[40%] bg-white p-8 shadow-lg rounded-lg max-h-[88%] overflow-y-auto scroll-container">
        <div className="w-full flex justify-between">
          <p className="text-blue-600 font-bold font-sans">Add education</p>
          <div
            className="bg-blue-600 p-1 rounded-full cursor-pointer"
            onClick={handleClose}
          >
            <IoClose size={20} />
          </div>
        </div>
        <form onSubmit={handleAddEducation}>
          <FormField
            wid="w-full mt-4"
            title="School"
            placeholder="Mzuzu University"
            value={formValues?.school}
            handleChangeText={(event: any) =>
              setFormValues({
                ...formValues,
                school: event.target.value,
              })
            }
          />
          <FormField
            wid="w-full mt-2"
            title="Degree / Certificate"
            placeholder="Bachelor of Science in Data Science"
            value={formValues?.degree}
            handleChangeText={(event: any) =>
              setFormValues({
                ...formValues,
                degree: event.target.value,
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

          <button
            className="mt-6 w-full bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center"
            type="submit"
            disabled={isAdding}
          >
            {isAdding ? (
              <div className="w-6 h-6 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
            ) : (
              <p className="text-sm font-bold font-sans">Add education</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EducationModal;
