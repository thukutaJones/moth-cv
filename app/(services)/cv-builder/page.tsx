"use client";

import FormField from "@/components/FormField";
import { baseUrl } from "@/constants/baseUrl";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import UploadDeleteImage from "@/components/UploadDeleteImage";
import { getUserIdFromCookie } from "@/constants/getUserId";

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  address: string;
}

const PersonalDetails = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    address: "",
  });
  const [file, setFile] = useState<any>(null);
  const [userImage, setUserImage] = useState<any>("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [personalDetails, setPersonalDetails] = useState<any>();
  const [uploadImageToggle, setUploadImageToggle] = useState<boolean>(false);

  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [isSavingData, setIsSavingData] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        setIsFetchingData(true);
        const userId = await getUserIdFromCookie();
        const res = await axios.get(
          `${baseUrl}/api/cv-details/personal-details/${userId}`
        );
        const personalDetails = res?.data?.personalDetails?.personalDetails;
        setPersonalDetails(personalDetails);
        setFormValues({
          ...formValues,
          fullName: personalDetails?.fullName || "",
          email: personalDetails?.email || "",
          phone: personalDetails?.phone || "",
          nationality: personalDetails?.nationality || "",
          address: personalDetails?.address || "",
        });
        setUserImage(personalDetails?.profilePhoto);
      } catch (error) {
      } finally {
        setIsFetchingData(false);
      }
    };
    fetchPersonalDetails();
  }, []);

  const handleNext = async () => {
    setIsSavingData(true);
    try {
      const formData = new FormData();
      formData.append("fullName", formValues.fullName);
      formData.append("email", formValues.email);
      formData.append("phone", formValues.phone);
      formData.append("address", formValues.address);
      formData.append("nationality", formValues.nationality);
      if (file && !userImage) {
        formData.append("image", file);
      } else {
        formData.append("profilePhoto", userImage);
      }
      const userId = await getUserIdFromCookie();
      await axios.post(
        `${baseUrl}/api/cv-details/personal-details/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      router.push("/cv-builder/work-experience");
    } catch (error) {
    } finally {
      setIsSavingData(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImageClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  return (
    <div className="p-4 md:px-20 flex justify-center">
      <section className="w-full md:w-[70%]">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-xl md:text-2xl text-black font-sans font-bold">
            Personal Details
          </h2>
        </div>
        <div>
          <div className="flex flex-col md:flex-row mt-4 gap-8 items-center md:items-start ">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              ref={imageInputRef}
            />
            <Image
              src={
                personalDetails?.profilePhoto && userImage
                  ? personalDetails?.profilePhoto
                  : file
                  ? URL.createObjectURL(file)
                  : "/avatar.jpg"
              }
              width={300}
              height={300}
              alt="profile_pic"
              className="w-28 h-28 rounded-full border-2 cursor-pointer"
              onClick={() => setUploadImageToggle(true)}
            />
            <div className="w-full">
              <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between w-full px-4">
                <FormField
                  wid="w-full md:w-[48%]"
                  title="Full name"
                  placeholder="Jones Thukuta"
                  value={formValues.fullName}
                  handleChangeText={(event: any) =>
                    setFormValues({
                      ...formValues,
                      fullName: event.target.value,
                    })
                  }
                />
                <FormField
                  wid="w-full md:w-[48%]"
                  title="E-mail"
                  type="email"
                  placeholder="yourname@example.com"
                  value={formValues.email}
                  handleChangeText={(event: any) =>
                    setFormValues({
                      ...formValues,
                      email: event.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-4 mt-4 md:gap-0 md:flex-row justify-between w-full px-4">
                <FormField
                  wid="w-full md:w-[48%]"
                  title="Phone number"
                  placeholder="0888941871"
                  type="number"
                  value={formValues.phone}
                  handleChangeText={(event: any) =>
                    setFormValues({
                      ...formValues,
                      phone: event.target.value,
                    })
                  }
                />
                <FormField
                  wid="w-full md:w-[48%]"
                  title="Nationality"
                  placeholder="Malawian"
                  value={formValues.nationality}
                  handleChangeText={(event: any) =>
                    setFormValues({
                      ...formValues,
                      nationality: event.target.value,
                    })
                  }
                />
              </div>
              <div className="px-4">
                <FormField
                  wid="w-full mt-4"
                  title="Address"
                  type="address"
                  placeholder="P/Box 201, Luwinga, Mzuzu"
                  value={formValues.address}
                  handleChangeText={(event: any) =>
                    setFormValues({
                      ...formValues,
                      address: event.target.value,
                    })
                  }
                />
              </div>
              <div className="mt-20 flex justify-between px-4">
                <div className="border-2 px-10 py-2 border-gray-500 cursor-pointer hover:scale-105">
                  <p className="text-gray-500 font-sans font-bold">Back</p>
                </div>
                <div
                  className="border-2 px-10 py-2 bg-blue-600 cursor-pointer hover:scale-105"
                  onClick={!isSavingData ? handleNext : () => null}
                >
                  {isSavingData ? (
                    <div className="w-6 h-6 border-t-2 border-r-2 border-white rounded-full animate-spin" />
                  ) : (
                    <p className="text-white font-sans font-bold">Continue</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isFetchingData && (
        <div className="absolute top-0 left-0 z-40 w-full h-full bg-white bg-opacity-70 flex items-center justify-center ">
          <div className="w-16 h-16 border-t-2 border-r-2 border-blue-600 rounded-full animate-spin" />
        </div>
      )}
      {uploadImageToggle && (
        <UploadDeleteImage
          handleDelete={() => {
            setFile(null);
            setUserImage("");
            setUploadImageToggle(false);
          }}
          handleUpload={() => {
            handleImageClick();
            setUploadImageToggle(false);
          }}
          handleClose={() => setUploadImageToggle(false)}
        />
      )}
    </div>
  );
};

export default PersonalDetails;
