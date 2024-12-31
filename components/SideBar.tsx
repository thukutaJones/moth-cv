"use client";

import Link from "next/link";
import React from "react";
import { RiHome5Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { TbFileDescription, TbFileCv } from "react-icons/tb"
import { LiaHandshake } from "react-icons/lia";


const SideBar = () => {
    const currentPath = usePathname();
  return (
    <div className='h-full  w-[5%] bg-white hidden md:flex flex-col gap-8 overflow-hidden'>
        <nav className="flex flex-col gap-12 w-full items-center">
        <Link href="/home" className="mt-20">
          <RiHome5Fill
            className={`${
              currentPath === "/home" ? "text-blue-600" : "text-gray-400"
            } transform transition-transform hover:scale-125 hover:text-blue-600`}
            size={25}
          />
        </Link>
        <Link href="/cv-builder" className="">
          <TbFileCv
            size={25}
            className={`${
              (currentPath === "/cv-builder" || currentPath.split("/")[1] === 'cv-builder') ? "text-blue-600" : "text-gray-400"
            } transform transition-transform hover:scale-125 hover:text-blue-600`}
          />
        </Link>
        <Link href="/mock-interview" className="">
          <LiaHandshake
            className={`${
              currentPath === "/mock-interview" ? "text-blue-600" : "text-gray-400"
            } transform transition-transform hover:scale-125 hover:text-blue-600`}
            size={25}
          />
        </Link>
        <Link href="/cover-letter" className="">
          <TbFileDescription
            className={`${
              currentPath === "/cover-letter" ? "text-blue-600" : "text-gray-400"
            } transform transition-transform hover:scale-125 hover:text-blue-600`}
            size={25}
          />
        </Link>
        <Link href="/profile" className="">
          <CgProfile
            className={`${
              currentPath === "/profile" ? "text-blue-600" : "text-gray-400"
            } transform transition-transform hover:scale-125 hover:text-blue-600`}
            size={25}
          />
        </Link>
      </nav>
    </div>
  )
}

export default SideBar
