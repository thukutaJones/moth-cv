import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeTopBar = () => {
  return (
    <div className="w-full h-full flex justify-between items-center px-8 bg-white">
      <Link href="/" className="flex flex-row gap-1 items-center ">
        <Image
          src="/logo.png"
          height={50}
          width={50}
          alt="Logo"
          className="h-8 w-8 object-contain hidden md:flex"
        />
        <h1 className="text-2xl md:text-3xl text-blue-600 font-bold">MothCV</h1>
      </Link>
      <div className="w-[50%] h-full flex justify-end items-center gap-4">
        <div className="h-10 px-4 md:px-0 md:w-[30%] rounded-lg hover:scale-110 bg-yellow-400 flex items-center justify-center cursor-pointer">
          <p className="text-white font-sans">Upgrade</p>
        </div>
        <Image
          src="/moth.jpeg"
          width={80}
          height={80}
          alt="profile_photoF"
          className="h-12 w-12 rounded-full border-2 border-blue-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default HomeTopBar;
