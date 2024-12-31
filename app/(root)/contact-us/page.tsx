"use client";

import React, { useState } from "react";
import { FaTiktok } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import FormField from "@/components/FormField";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";

interface FormValues {
  fullName: string;
  email: string;
  inquiry: string;
}

const Contact = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    fullName: "",
    email: "",
    inquiry: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await axios.post(`${baseUrl}/api/inquiry/submit`, formValues);
      setAlertMessage("Thank you for submitting, your inquiry...");
      setFormValues({ fullName: "", email: "", inquiry: "" });
    } catch (error) {
      setAlertMessage("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-150px)] mt-[80px] flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-40">
      <section className="flex items-center w-full md:w-[50%] animated  wow fadeInLeft">
        <div className="">
          <p
            className="text-4xl font-sans text-black"
            style={{ fontWeight: 500 }}
          >
            Contact us
          </p>
          <p className="hidden md:flex mt-4 font-sans text-gray-600 text-sm">
            Need to get in touch with us? Either fill out the form with your
            inquiry or use the icons below
          </p>
          <div className="flex flex-row gap-4 mt-4">
            <FaTiktok className="text-gray-600 md:text-blue-600" size={25} />
            <FaFacebookF className="text-gray-600 md:text-blue-600" size={25} />
            <FaInstagram className="text-gray-600 md:text-blue-600" size={25} />
            <FaWhatsapp className="text-gray-600 md:text-blue-600" size={25} />
            <IoMdMail className="text-gray-600 md:text-blue-600" size={25} />
          </div>
        </div>
      </section>
      <section className="w-full md:w-[40%] mt-8 md:mt-0 animated  wow fadeInRight">
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white p-4 border border-gray-50 shadow-xl rounded-xl"
        >
          <FormField
            title="Full Name"
            placeholder="e.g. Jones Thukuta"
            type="text"
            value={formValues.fullName}
            handleChangeText={(e: any) =>
              setFormValues({ ...formValues, fullName: e.target.value })
            }
          />
          <FormField
            wid="mt-4 mb-8"
            title="E-mail"
            placeholder="yourname@example.com"
            type="email"
            value={formValues.email}
            handleChangeText={(e: any) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
          />
          <div className="flex flex-col">
            <label className="text-xs font-sans font-bold text-black">
              What can we help you with
            </label>
            <textarea
              className="h-20 border border-gray-300 text-gray-600 focus:outline-none focus:border-blue-600 px-4 scroll-container"
              value={formValues.inquiry}
              onChange={(e: any) =>
                setFormValues({ ...formValues, inquiry: e.target.value })
              }
            />
          </div>
          <div className="w-full flex justify-end">
            <button
              className="mt-6 w-[30%] bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
              ) : (
                <p className="text-sm font-bold font-sans">Submit</p>
              )}
            </button>
          </div>
        </form>
      </section>
      {alertMessage && (
        <div className="absolute w-full h-full top-0 left-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
          <div className="w-[90%] md:w-[45%] bg-white shadow-2xl p-8 rounded-lg">
            <p className="text-black font-sans text-xl">{alertMessage}</p>
            <div className="w-full mt-8 flex justify-end">
              <div
                className="bg-green-500 py-1 px-10 cursor-pointer hover:scale-105"
                onClick={() => setAlertMessage("")}
              >
                OK
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
