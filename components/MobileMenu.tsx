"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  return (
    <div className="md:hidden">
      <div
        className="flex flex-col gap-1 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`w-6 h-1 bg-blue-600 rounded-sm ${
            isOpen ? "rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-blue-600  rounded-sm ${
            isOpen ? "opacity-0" : ""
          } ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-blue-600  rounded-sm ${
            isOpen ? "-rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
      </div>
      {isOpen && (
        <div className="absolute left-0 top-[80px] w-full h-[calc(100vh-80px)] bg-slate-200 p-4 text-gray-600 flex flex-col gap-4 font-semibold text-xl z-10 items-center justify-center ">
          <button
            className="mt-4"
            onClick={() => {
              setIsOpen(false);
              router.push("/");
            }}
          >
            Home
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              router.push("/services");
            }}
          >
            Services
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              router.push("/about");
            }}
          >
            About
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              router.push("/contact-us");
            }}
          >
            Contct Us
          </button>
          <p className="absolute bottom-4 text-sm text-center p-4 text-gray-400">
            © 2024 MothCV, Inc.
          </p>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
