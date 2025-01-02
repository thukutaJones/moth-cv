"use client";

import React, { useEffect, useState } from "react";

const CVLatter = () => {
  useEffect(() => {
    const token: string = localStorage.getItem("moth-cv-token") || "";
    if (!token) {
      window.location.href = "/sign-in";
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <div className="w-full">
        <p className="text-center text-5xl text-black font-sans font-bold">
          Coming soon
        </p>
        <p className="text-center text-sm mt-2 text-gray-400">
          This service will be available shortly
        </p>
      </div>
    </div>
  );
};

export default CVLatter;
