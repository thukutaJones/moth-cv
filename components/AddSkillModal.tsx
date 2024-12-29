"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import FormField from "./FormField";
import { SiGooglegemini } from "react-icons/si";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";
import { getUserIdFromCookie } from "@/constants/getUserId";

const AddSkillModal = ({
  handleClose,
  callBack,
}: {
  handleClose: () => void;
  callBack: () => Promise<void>;
}) => {
  const [skill, setSkill] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAddSkill = async (e: any) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const userId = await getUserIdFromCookie()
      const payload = { skill, owner: userId };
      await axios.post(
        `${baseUrl}/api/cv-details/skills/${userId}`,
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

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white z-30 bg-opacity-90 flex items-center justify-center px-4">
      <div className="w-full md:w-[40%] bg-white p-8 shadow-lg rounded-lg max-h-[88%] overflow-y-auto scroll-container">
        <div className="w-full flex justify-between">
          <p className="text-blue-600 font-bold font-sans">Add skill</p>
          <div
            className="bg-blue-600 p-1 rounded-full cursor-pointer"
            onClick={handleClose}
          >
            <IoClose size={20} />
          </div>
        </div>
        <form onSubmit={handleAddSkill}>
          <FormField
            wid="w-full mt-2"
            title="Skill"
            placeholder="Team player"
            value={skill}
            handleChangeText={(event: any) => setSkill(event.target.value)}
          />

          <button
            className="mt-6 w-full bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center"
            type="submit"
            disabled={isAdding}
          >
            {isAdding ? (
              <div className="w-6 h-6 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
            ) : (
              <p className="text-sm font-bold font-sans">Add Skill</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSkillModal;
