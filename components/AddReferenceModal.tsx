"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import FormField from "./FormField";
import { SiGooglegemini } from "react-icons/si";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";
import { getUserIdFromCookie } from "@/constants/getUserId";

interface FormValues {
  company: string;
  name: string;
  phone: string;
  email: string;
}

const AddReferencesMdal = ({
  handleClose,
  callBack,
  reference
}: {
  handleClose: () => void;
  callBack: () => Promise<void>;
  reference: any;
}) => {
  const [formValues, setFormValues] = useState<FormValues>({
    company: reference?.company,
    name: reference?.name,
    phone: reference?.phone,
    email: reference?.email,
  });
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAddReference = async (e: any) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const userId = await getUserIdFromCookie()
      const payload = { ...formValues, owner: userId };
      await axios.post(
        `${baseUrl}/api/cv-details/references/${userId}`,
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
          <p className="text-blue-600 font-bold font-sans">Add reference</p>
          <div
            className="bg-blue-600 p-1 rounded-full cursor-pointer"
            onClick={handleClose}
          >
            <IoClose size={20} />
          </div>
        </div>
        <form onSubmit={handleAddReference}>
          <FormField
            wid="w-full mt-4"
            title="Name"
            placeholder="Mr Jones Thukuta"
            value={formValues?.name}
            handleChangeText={(event: any) =>
              setFormValues({
                ...formValues,
                name: event.target.value,
              })
            }
          />
          <FormField
            wid="w-full mt-2"
            title="Company"
            placeholder="DAPP Malawi"
            value={formValues?.company}
            handleChangeText={(event: any) =>
              setFormValues({
                ...formValues,
                company: event.target.value,
              })
            }
          />
          <FormField
            wid="w-full mt-4"
            title="Phone"
            type="number"
            placeholder="0888941871"
            value={formValues?.phone}
            handleChangeText={(event: any) =>
              setFormValues({
                ...formValues,
                phone: event.target.value,
              })
            }
          />
          <FormField
            wid="w-full mt-4"
            title="E-mail"
            placeholder="yourmail@example.com"
            type="email"
            value={formValues?.email}
            handleChangeText={(event: any) =>
              setFormValues({
                ...formValues,
                email: event.target.value,
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
              <p className="text-sm font-bold font-sans">Add reference</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReferencesMdal;
