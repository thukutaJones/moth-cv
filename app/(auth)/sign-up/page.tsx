"use client";

import SignInFormField from "@/components/SignInFormField";
import { baseUrl } from "@/constants/baseUrl";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface FormValues {
  email: string;
  password: string;
  fullName: string;
  comfirmPassword: string;
}

const Signup = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
    fullName: "",
    comfirmPassword: "",
  });
  const [formError, setFormError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<{
    setPassword: boolean;
    comfirmPassword: boolean;
  }>({ setPassword: true, comfirmPassword: true });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formValues.password !== formValues.comfirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    setFormError("");
    setIsSubmitting(true);
    try {
      const payload = {
        email: formValues.email,
        password: formValues.password,
        fullName: formValues.fullName,
      };
      const res = await axios.post(`${baseUrl}/api/auth/sign-up`, payload);
      const { token } = res.data;
      localStorage.setItem("moth-cv-token", token);
      window.location.href = `/home`;
    } catch (error: any) {
      setFormError(
        error?.response?.data?.message ||
          "Something went wrong!! Please try again"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full z-10 bg-white bg-opacity-50 flex items-center justify-center md:justify-end px-4 md:px-20">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[40%] bg-white shadow-md p-4 rounded-lg flex flex-col items-center overflow-y-auto max-h-[85vh] scroll-container"
      >
        <h1 className="text-3xl font-sans font-bold text-center text-gray-300">MOTH CV</h1>
        <h2 className="mt-4 text-xl text-center font-bold font-sans">
          Sign up and Stand out
        </h2>
        {formError && (
          <p className="text-red-500 text-sm font-sans font-bold mt-2">
            {formError}
          </p>
        )}
        <SignInFormField
          title="Fullname"
          wid="w-full mt-4"
          value={formValues.fullName}
          handleChangeText={(e: any) =>
            setFormValues({ ...formValues, fullName: e.target.value })
          }
          placeholder="John Doe"
          textStyles="text-white text-sm placeholder:text-gray-300"
        />
        <SignInFormField
          title="E-maiil"
          wid="w-full mt-4"
          value={formValues.email}
          handleChangeText={(e: any) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
          type="email"
          placeholder="yourname@mail.com"
          textStyles="text-white text-sm placeholder:text-gray-300"
        />
        <SignInFormField
          title="Set password"
          wid="w-full mt-4"
          value={formValues.password}
          hidePassword={hidePassword.setPassword}
          handleHidePassword={() =>
            setHidePassword({
              ...hidePassword,
              setPassword: !hidePassword.setPassword,
            })
          }
          handleChangeText={(e: any) =>
            setFormValues({ ...formValues, password: e.target.value })
          }
          placeholder="••••••••••••"
          textStyles="text-white text-sm placeholder:text-gray-300"
        />
        <SignInFormField
          title="Comfirm password"
          wid="w-full mt-4"
          value={formValues.comfirmPassword}
          hidePassword={hidePassword.comfirmPassword}
          handleHidePassword={() => {
            setHidePassword({
              ...hidePassword,
              comfirmPassword: !hidePassword.comfirmPassword,
            });
          }}
          handleChangeText={(e: any) =>
            setFormValues({ ...formValues, comfirmPassword: e.target.value })
          }
          placeholder="••••••••••••"
          textStyles="text-white text-sm placeholder:text-gray-300"
        />
        <button
          className="w-full flex gap-2 mb-4 bg-blue-600 bg-opacity-80 p-2 mt-6 rounded-xl items-center justify-center cursor-pointer"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-t-2 border-r-2 border-white rounded-full animate-spin" />
          ) : (
            <p className="text-white font-bold">Sign Up</p>
          )}
        </button>
        <Link href="/sign-in">
          <p className="text-black text-sm font-bold cursor-pointer">
            Already have an account?{" "}
            <span className="text-blue-600">Sign In</span>
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
