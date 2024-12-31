"use client";

import { baseUrl } from "@/constants/baseUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import AddReferencesMdal from "@/components/AddReferenceModal";
import { getUserIdFromCookie } from "@/constants/getUserId";

const References = () => {
  const [addReferenceToggle, setAddReferenceToggle] = useState<boolean>(false);
  const [references, setReferences] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [selectedRefForDel, setSelectedRefForDel] = useState<any>({});
  const [selectedRef, setSelectedRef] = useState<any>({});

  const router = useRouter();

  const fetchReferences = async () => {
    try {
      setIsFetchingData(true);
      const userId = await getUserIdFromCookie();
      const res = await axios.get(
        `${baseUrl}/api/cv-details/references/${userId}`
      );
      setReferences(res?.data?.references?.references || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingData(false);
    }
  };
  useEffect(() => {
    fetchReferences();
  }, []);

  const handleNext = () => {
    router.push("/cv-builder/export-cv");
  };

  const handleBack = () => { 
    router.push("/cv-builder/objective");
  };

  const handleDelete = async (name: string, company: string, phone: string) => {
    setIsDeleting(true);
    try {
      const userId = await getUserIdFromCookie();
      await axios.delete(
        `${baseUrl}/api/cv-details/references/${userId}/${name}/${company}/${phone}`
      );
      fetchReferences();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4 md:px-20 flex md:flex-row justify-center">
      <section className="w-full md:w-[60%]">
        <p className="text-2xl font-bold font-sans text-gray-600">
          Add your <span className="text-blue-600">references</span>
        </p>
        <div className="w-full p-4 space-y-4">
          {references.length && (
            <div className="w-full space-y-4">
              {references?.map((reference: any, index: number) => (
                <div
                  key={index?.toString()}
                  className="bg-white shadow-sm text-blue-600 rounded-lg px-4 py-6 cursor-pointer hover:scale-105 flex gap-2 items-start justify-between"
                >
                  <div
                    className="w-[75%]"
                    onClick={() => {
                      setSelectedRef(reference);
                      setAddReferenceToggle(true);
                    }}
                  >
                    <p className="font-sans overflow-clip whitespace-nowrap text-ellipsis">
                      <span className="font-bold">{reference?.name}</span>,{" "}
                      {reference?.company}
                    </p>
                    <p className="text-gray-400 text-xs">
                      Cell: {reference?.phone}
                      <br />
                      E-mail: {reference?.email}
                      <br />
                      Adress: {reference?.address}
                    </p>
                    
                  </div>
                  <div className="flex gap-2">
                    {isDeleting &&
                    selectedRefForDel?.name === reference?.name &&
                    selectedRefForDel?.company === reference?.company &&
                    selectedRefForDel?.phone === reference?.phone ? (
                      <div className="w-6 h-6 border-t-2 border-r-2 border-red-500 rounded-full animate-spin" />
                    ) : (
                      <div
                        className="border border-red-600 px-2 py-1 rounded-md"
                        onClick={async () => {
                          setSelectedRefForDel({
                            ...selectedRefForDel,
                            name: reference?.name,
                            company: reference?.company,
                            phone: reference?.phone,
                          });
                          await handleDelete(
                            reference?.name,
                            reference?.company,
                            reference?.phone
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
            onClick={() => setAddReferenceToggle(true)}
          >
            <FaPlus />
            <p>Add reference</p>
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
      {addReferenceToggle && (
        <AddReferencesMdal
          handleClose={() => {
            setSelectedRef(null);
            setAddReferenceToggle(false);
          }}
          callBack={fetchReferences}
          reference={selectedRef}
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

export default References;
