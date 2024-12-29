"use client";

import FormField from "@/components/FormField";
import { baseUrl } from "@/constants/baseUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { SiGooglegemini } from "react-icons/si";
import EnterJobTitle from "@/components/EnterJobTitleModal";
import { getUserIdFromCookie } from "@/constants/getUserId";

const ProfessionalSummary = () => {
  const [proffessinalSummary, setProffessinalSummary] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [getProfessionalSummaryToggle, setGetProfessionalSummaryToggle] =
    useState<boolean>(false);
  const router = useRouter();

  const fetchProffessinalSummary = async () => {
    try {
      setIsFetchingData(true);
      const userId = await getUserIdFromCookie();
      const res = await axios.get(
        `${baseUrl}/api/cv-details/proffessional-summary/${userId}`
      );
      console.log(res?.data?.proffessinalSummary);
      setProffessinalSummary(
        res?.data?.proffessinalSummary?.proffessinalSummary || ""
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingData(false);
    }
  };

  useEffect(() => {
    fetchProffessinalSummary();
  }, []);

  const handleNext = async (e: any) => {
    e.preventDefault();
    setIsAdding(true);
    const userId = await getUserIdFromCookie();
    try {
      const payload = {
        proffessinalSummary,
        owner: userId,
      };
      await axios.post(
        `${baseUrl}/api/cv-details/proffessional-summary/${userId}`,
        payload
      );
      router.push("/cv-builder/references");
    } catch (error) {
      console.log(error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleBack = () => {
    router.push("/cv-builder/skills");
  };

  return (
    <div className="p-4 md:px-20 flex md:flex-row justify-center">
      <section className="w-full md:w-[60%]">
        <p className="text-2xl font-bold font-sans text-gray-600">
          Add your <span className="text-blue-600">professional summary</span>
        </p>
        <div className="w-full p-4 space-y-4">
          <form onSubmit={handleNext}>
            <div className="flex justify-between w-full items-center mt-2">
              <label className="text-xs font-sans font-bold text-black">
                Professional <summary></summary>
              </label>
              <div
                className="flex gap-1 px-4 py-1 bg-blue-600 rounded-full items-center cursor-pointer"
                onClick={() => setGetProfessionalSummaryToggle(true)}
              >
                <p className="text-xs">Auto generate</p>
                <SiGooglegemini size={20} color="white" />
              </div>
            </div>
            <textarea
              id="multiline-input"
              required
              rows={5}
              cols={50}
              value={proffessinalSummary}
              onChange={(e) => setProffessinalSummary(e.target.value)}
              className="w-full h-40 bg-transparent border border-gray-300 focus:border-blue-600 outline-none focus:outline-none px-4 py-2 text-sm text-gray-600 mt-2 scroll-container"
            />

            <div className="mt-20 flex justify-between px-4">
              <div
                className="border-2 px-10 py-2 border-gray-500 cursor-pointer hover:scale-105"
                onClick={handleBack}
              >
                <p className="text-gray-500 font-sans font-bold">Back</p>
              </div>
              <button
                className="border-2 px-10 py-2 bg-blue-600 cursor-pointer hover:scale-105"
                type="submit"
              >
                {isAdding ? (
                  <div className="w-6 h-6 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                ) : (
                  <p className="text-white font-sans font-bold">Continue</p>
                )}
              </button>
            </div>
          </form>
        </div>
        {isFetchingData && (
          <div className="absolute top-0 left-0 z-40 w-full h-full bg-white bg-opacity-70 flex items-center justify-center ">
            <div className="w-16 h-16 border-t-2 border-r-2 border-blue-600 rounded-full animate-spin" />
          </div>
        )}
        {getProfessionalSummaryToggle && (
          <EnterJobTitle
            handleClose={() => setGetProfessionalSummaryToggle(false)}
            callBack={(text: string) => setProffessinalSummary(text)}
          />
        )}
      </section>
    </div>
  );
};

export default ProfessionalSummary;
