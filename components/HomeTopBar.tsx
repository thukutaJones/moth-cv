"use client";

import Image from "next/image";
import Link from "next/link";
import HomeMobileMenu from "./HomeMobileMenu";
import { retriveUserData } from "@/constants/retriveUserData";
import { useEffect, useState } from "react";

const HomeTopBar = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const token: string = localStorage.getItem("moth-cv-token") || "";
      const user: any = await retriveUserData(token);
      setUser(user);
    };
    fetchUser();
  }, []);
  return (
    <div className="w-full h-full flex justify-between items-center px-4 md:px-8 bg-white">
      <div className="flex flex-row gap-1 items-center ">
        <Image
          src="/logo.png"
          height={50}
          width={50}
          alt="Logo"
          className="h-8 w-8 object-contain hidden md:flex"
        />
        <div className="flex gap-1 items-center">
          <HomeMobileMenu />
          <h1 className="text-2xl md:text-3xl text-blue-600 font-bold">
            MothCV
          </h1>
        </div>
      </div>
      <div className="w-[50%] h-full flex justify-end items-center gap-4">
        <div className="h-10 px-4 md:px-0 md:w-[30%] rounded-lg hover:scale-110 bg-yellow-400 flex items-center justify-center cursor-pointer">
          <p className="text-white font-sans">Upgrade</p>
        </div>
        <Link href="/profile">
        {
          user?.profilePhoto ? (
            <Image
              src={user?.profilePhoto}
              width={80}
              height={80}
              alt="profile_photo"
              className="h-12 w-12 rounded-full border-2 border-blue-500 cursor-pointer"
            />
          ) : (
            <div className="h-12 w-12 rounded-full border-2 border-blue-500 cursor-pointer flex items-center justify-center" />
          )
        }
        </Link>
      </div>
    </div>
  );
};

export default HomeTopBar;
