"use client";

import WorkExperienceModal from "@/components/WorkExperienceModal";
import { baseUrl } from "@/constants/baseUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { getUserId } from "@/constants/getUserId";

const WorkExperience = () => {
  const [addExperienceToggle, setAddExperienceToggle] =
    useState<boolean>(false);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [selectedExpForDel, setSelectedExpForDel] = useState<any>({});
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

  const router = useRouter();

  const fetchWorkExperience = async () => {
    try {
      setIsFetchingData(true);
      const token: string = localStorage.getItem("moth-cv-token") || "";
      const userId = await getUserId(token);
      const res = await axios.get(
        `${baseUrl}/api/cv-details/work-experience/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setWorkExperiences(res?.data?.workExperience?.workExperience || []);
    } catch (error) {
    } finally {
      setIsFetchingData(false);
    }
  };
  useEffect(() => {
    fetchWorkExperience();
  }, []);

  useEffect(() => {
    const token: string = localStorage.getItem("moth-cv-token") || "";
    if (!token) {
      window.location.href = "/sign-in";  
    }
  }
  , []);

  const handleNext = () => {
    router.push("/cv-builder/education-background");
  };

  const handleBack = () => {
    router.push("/cv-builder");
  };

  const handleDelete = async (
    jobTitle: string,
    company: string,
    startDate: string
  ) => {
    setIsDeleting(true);
    try {
      const token: string = localStorage.getItem("moth-cv-token") || "";
      const userId = await getUserId(token);
      await axios.delete(
        `${baseUrl}/api/cv-details/work-experience/${userId}/${jobTitle}/${company}/${startDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      fetchWorkExperience();
    } catch (error: any) {
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4 md:px-20 flex md:flex-row justify-center">
      <section className="w-full md:w-[60%]">
        <p className="text-2xl font-bold font-sans text-gray-600">
          Add your <span className="text-blue-600">experience</span>
        </p>
        <div className="w-full p-4 space-y-4">
          {workExperiences.length && (
            <div className="w-full space-y-4">
              {workExperiences?.map((experience: any, index: number) => (
                <div
                  key={index?.toString()}
                  className="bg-white shadow-sm text-blue-600 rounded-lg px-4 py-6 cursor-pointer hover:scale-105 flex gap-2 items-start justify-between"
                >
                  <div
                    className="w-[75%]"
                    onClick={() => {
                      setSelectedExperience(experience);
                      setAddExperienceToggle(true);
                    }}
                  >
                    <p className="font-sans overflow-clip whitespace-nowrap text-ellipsis">
                      <span className="font-bold">{experience?.jobTitle}</span>{" "}
                      at {experience?.company}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {new Date(experience?.startDate).toDateString()?.slice(4)}{" "}
                      - {new Date(experience?.endDate).toDateString()?.slice(4)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {isDeleting &&
                    selectedExpForDel?.jobTitle === experience?.jobTitle &&
                    selectedExpForDel?.company === experience?.company &&
                    selectedExpForDel?.startDate === experience?.startDate ? (
                      <div className="w-6 h-6 border-t-2 border-r-2 border-red-500 rounded-full animate-spin" />
                    ) : (
                      <div
                        className="border border-red-600 px-2 py-1 rounded-md"
                        onClick={async () => {
                          setSelectedExpForDel({
                            ...selectedExpForDel,
                            jobTitle: experience?.jobTitle,
                            company: experience?.company,
                            startDate: experience?.startDate,
                          });
                          await handleDelete(
                            experience?.jobTitle,
                            experience?.company,
                            experience?.startDate
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
            className="border border-dotted border-blue-600 py-3 cursor-pointer hover:scale-105 flex gap-2 items-center justify-center text-blue-600 uppercase text-sm"
            onClick={() => setAddExperienceToggle(true)}
          >
            <FaPlus />
            <p>Add experience</p>
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
      {addExperienceToggle && (
        <WorkExperienceModal
          handleClose={() => {
            setSelectedExperience(null);
            setAddExperienceToggle(false);
          }}
          callBack={fetchWorkExperience}
          experience={selectedExperience}
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

export default WorkExperience;
