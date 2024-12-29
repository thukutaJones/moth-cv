"use client";

import { baseUrl } from "@/constants/baseUrl";
import Image from "next/image";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const signInWithGoogle = async () => {
    try {
      window.location.href = `${baseUrl}/api/auth/google-signin`;
    } catch (error) {
    }
  };
  return (
    <div className="min-h-screen flex-1 w-full relative">
      <Image
        src="/signInBg.jpeg"
        width={1000}
        height={1000}
        alt="bg"
        className="hidden md:flex h-screen w-full"
      />
      <Image
        src="/modileSignInBg.jpeg"
        width={1000}
        height={1000}
        alt="bg"
        className="md:hidden h-screen w-full"
      />
      <div className="absolute top-0 left-0 h-full w-full z-10 bg-white bg-opacity-20 flex items-center justify-center md:justify-end px-4 md:px-20">
        <div className="w-full md:w-[40%] bg-black bg-opacity-20 p-4 rounded-lg flex flex-col items-center">
          <h1 className="text-3xl font-sans font-bold text-center">MOTH CV</h1>
          <Image
            src="/logo.png"
            width={200}
            height={200}
            alt="logo"
            className="w-16 h-16"
          />
          <h2 className="mt-10 text-xl text-center font-bold font-sans">
            Struggling to Stand Out? We've Got You Covered.
          </h2>
          <p className="text-xs font-sans text-center w-[70%]">
            Sign in to craft your CV, connect with opportunities, and unlock
            your full potential.
          </p>
          <div
            className="w-full flex gap-2 mb-4 bg-white bg-opacity-80 p-2 mt-20 rounded-xl items-center justify-center cursor-pointer"
            onClick={signInWithGoogle}
          >
            <FcGoogle size={30} />
            <p className="text-gray-600 font-bold">Continue with google</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
