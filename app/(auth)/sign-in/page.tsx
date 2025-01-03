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
}

const SignIn = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFormError("")
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${baseUrl}/api/auth/sign-in`, formValues);
      const { token } = res.data;
      localStorage.setItem("moth-cv-token", token);
      window.location.href = `/home`;;
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
    <div className="absolute top-0 left-0 h-full w-full z-10 flex items-center justify-center md:justify-end px-4 md:px-20">
      <form onSubmit={handleSubmit} className="w-full shadow-md md:w-[40%] bg-white  p-4 rounded-lg flex flex-col items-center">
        <h1 className="text-3xl font-sans font-bold text-center">MOTH CV</h1>
        <h2 className="mt-4 text-xs text-gray-400 text-center font-bold font-sans mb-4">
          Struggling to Stand Out? We've Got You Covered.
        </h2>
        {formError && (
          <p className="text-red-500 text-sm font-sans font-bold mt-2">
            {formError}
          </p>
        )}
        <SignInFormField
          title="E-maiil"
          wid="w-full"
          value={formValues.email}
          handleChangeText={(e: any) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
          type="email"
          placeholder="yourname@mail.com"
          textStyles="text-white text-sm placeholder:text-gray-300"
        />
        <SignInFormField
          title="Password"
          wid="w-full mt-4"
          value={formValues.password}
          handleChangeText={(e: any) =>
            setFormValues({ ...formValues, password: e.target.value })
          }
          placeholder="••••••••••••"
          handleHidePassword={() => setHidePassword(!hidePassword)}
          hidePassword={hidePassword}
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
            <p className="text-white font-bold">Sign In</p>
          )}
        </button>
        <Link href="/sign-up">
          <p className="text-gray-500 text-sm font-bold cursor-pointer">
            Don't have an account?{" "}
            <span className="text-blue-600">Sign Up</span>
          </p>
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
