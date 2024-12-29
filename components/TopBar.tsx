"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";

const TopBar = () => {
  const currentRoute = usePathname();
  return (
    <div className="fixed top-0 left-0 w-full flex flex-row bg-white h-[80px] justify-between items-center p-4 z-50">
      <div className="flex flex-row items-center gap-1 font-sans">
        <MobileMenu />
        <Link href="/" className="flex flex-row gap-1 items-center ">
          <Image
            src="/logo.png"
            height={50}
            width={50}
            alt="Logo"
            className="h-8 w-8 object-contain hidden md:flex"
          />
          <h1 className="text-2xl md:text-3xl text-blue-600 font-bold">
            MothCV
          </h1>
        </Link>
      </div>
      <div className="flex flex-row items-center gap-[10%] w-[80%] justify-end">
        <nav className="hidden md:flex flex-row items-center  border-black gap-10 text-gray-600 font-semibold">
          <Link
            href="/"
            className={`${
              currentRoute === "/" && "border-b-2 px-2 border-b-blue-600"
            } hover:border-b-2 px-2 hover:border-b-blue-600`}
          >
            <p>Home</p>
          </Link>
          <Link
            href="/services"
            className={`${
              currentRoute === "/services" &&
              "border-b-2 px-2 border-b-blue-600"
            } hover:border-b-2 px-2 hover:border-b-blue-600`}
          >
            <p>Services</p>
          </Link>
          <Link
            href="/about"
            className={`${
              currentRoute === "/about" && "border-b-2 px-2 border-b-blue-600"
            } hover:border-b-2 px-2 hover:border-b-blue-600`}
          >
            <p>About</p>
          </Link>
          <Link
            href="/contact-us"
            className={`${
              currentRoute === "/contact-us" &&
              "border-b-2 px-2 border-b-blue-600"
            } hover:border-b-2 px-2 hover:border-b-blue-600`}
          >
            <p>Contact Us</p>
          </Link>
        </nav>
        <Link href='/sign-in' className="px-4 bg-blue-600 py-1 flex items-center justify-center rounded-lg cursor-pointer">
          <p className="text-white font-sans">Sign In</p>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
