"use client";

import { baseUrl } from "@/constants/baseUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import EducationModal from "@/components/EducationModal";
import { getUserIdFromCookie } from "@/constants/getUserId";

const Education = () => {
  const [addEducationToggle, setAddEducationToggle] = useState<boolean>(false);
  const [educationBackgrounds, setEducationBackgrounds] = useState([]);
  const [selectedEdu, setSelectedEdu] = useState<any>({});
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [selectedEduForDel, setSelectedEduForDel] = useState<any>({});
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

  const router = useRouter();

  const fetchEducationDetails = async () => {
    setIsFetchingData(true);
    try {
      const userId = await getUserIdFromCookie();
      const res = await axios.get(
        `${baseUrl}/api/cv-details/education/${userId}`
      );
      setEducationBackgrounds(res?.data?.education?.education || []);
    } catch (error) {
    } finally {
      setIsFetchingData(false);
    }
  };
  useEffect(() => {
    fetchEducationDetails();
  }, []);

  const handleNext = () => {
    router.push("/cv-builder/skills");
  };

  const handleBack = () => {
    router.push("/cv-builder/work-experience");
  };

  const handleDelete = async (
    degree: string,
    school: string,
    startDate: string
  ) => {
    setIsDeleting(true);
    try {
      const userId = await getUserIdFromCookie();
      await axios.delete(
        `${baseUrl}/api/cv-details/education/${userId}/${degree}/${school}/${startDate}`
      );
      fetchEducationDetails();
    } catch (error: any) {
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4 md:px-20 flex md:flex-row justify-center">
      <section className="w-full md:w-[60%]">
        <p className="text-2xl font-bold font-sans text-gray-600">
          Add your <span className="text-blue-600">education</span>
        </p>
        <div className="w-full p-4 space-y-4">
          {educationBackgrounds.length && (
            <div className="w-full space-y-4">
              {educationBackgrounds?.map((education: any, index: number) => (
                <div
                  key={index?.toString()}
                  className="bg-white shadow-sm text-blue-600 rounded-lg px-4 py-6 cursor-pointer hover:scale-105 flex gap-2 items-start justify-between"
                >
                  <div
                    className="w-[75%]"
                    onClick={() => {
                      setSelectedEdu(education);
                      setAddEducationToggle(true);
                    }}
                  >
                    <p className="font-sans overflow-clip whitespace-nowrap text-ellipsis">
                      <span className="font-bold">{education?.degree}</span> at{" "}
                      {education?.school}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {new Date(education?.startDate).toDateString()?.slice(4)}{" "}
                      - {new Date(education?.endDate).toDateString()?.slice(4)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {isDeleting &&
                    selectedEduForDel?.degree === education?.degree &&
                    selectedEduForDel?.school === education?.school &&
                    selectedEduForDel?.startDate === education?.startDate ? (
                      <div className="w-6 h-6 border-t-2 border-r-2 border-red-500 rounded-full animate-spin" />
                    ) : (
                      <div
                        className="border border-red-600 px-2 py-1 rounded-md"
                        onClick={async () => {
                          setSelectedEduForDel({
                            ...selectedEduForDel,
                            degree: education?.degree,
                            school: education?.school,
                            startDate: education?.startDate,
                          });
                          await handleDelete(
                            education?.degree,
                            education?.school,
                            education?.startDate
                          );
                        }}
                      >
                        <MdDelete className="text-red-600" size={16} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div
            className="border border-dotted border-blue-600 py-3 cursor-pointer hover:scale-110 flex gap-2 items-center justify-center text-blue-600 uppercase text-sm"
            onClick={() => setAddEducationToggle(true)}
          >
            <FaPlus />
            <p>Add education</p>
          </div>
        </div>
        <div className="mt-20 flex justify-between px-4">
          <div
            className="border-2 px-10 py-2 border-gray-500 cursor-pointer hover:scale-105"
            onClick={handleBack}
          >
            <p className="text-gray-500 font-sans font-bold">Back</p>
          </div>
          <div
            className="border-2 px-10 py-2 bg-blue-600 cursor-pointer hover:scale-105"
            onClick={handleNext}
          >
            <p className="text-white font-sans font-bold">Continue</p>
          </div>
        </div>
      </section>
      {addEducationToggle && (
        <EducationModal
          handleClose={() => {
            setSelectedEdu({});
            setAddEducationToggle(false);
          }}
          callBack={fetchEducationDetails}
          education={selectedEdu}
        />
      )}
      {isFetchingData && (
        <div className="absolute top-0 left-0 z-40 w-full h-full bg-white bg-opacity-70 flex items-center justify-center ">
          <div className="w-16 h-16 border-t-2 border-r-2 border-blue-600 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Education;
