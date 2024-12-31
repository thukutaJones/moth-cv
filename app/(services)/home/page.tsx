import React from "react";
import { LiaHandshake } from "react-icons/lia";
import { TbFileDescription, TbFileCv } from "react-icons/tb";

import { interviewTips } from "@/constants/inteviewTips";
import Link from "next/link";
import { retriveUserData } from "@/constants/retriveUserData";

const Home = async() => {
  const colors = ['bg-gray-50', 'bg-green-50', 'bg-orange-50', 'bg-purple-50']
  const user:any = await retriveUserData()
  return (
    <div className="w-full bg-white px-6 py-4">
      <div className="md:flex items-center justify-between">
        <div>
          <h2 className="text-black font-sans font-bold text-2xl">
            Hey, {user?.fullName?.split(" ")[0]} 👋!
          </h2>
          <p className="mt-1 text-sm font-sans text-gray-400">
            What would you like to do...
          </p>
        </div>
        <div className="w-full md:w-[70%] mt-4 md:mt-0 md:flex justify-end gap-4 space-y-2 md:space-y-0 md:h-20">
          <Link href='/cv-builder' className="h-20 md:h-full min-w-52 flex gap-2 items-center shadow-sm md:shadow-lg border border-gray-100 rounded-lg px-2 hover:scale-105 cursor-pointer">
            <TbFileCv color="blue" size={25} />
            <div>
              <p className="font-sans font-bold text-black">CV / Resume</p>
              <p className="text-xs text-gray-400 font-sans">
                Build an outstanding CV
              </p>
            </div>
          </Link>
          <Link href='/cover-letter' className="h-20 md:h-full min-w-52 flex gap-2 items-center shadow-sm md:shadow-lg border border-gray-100 rounded-lg px-2 hover:scale-105 cursor-pointer">
            <TbFileDescription color="purple" size={25} />
            <div>
              <p className="font-sans font-bold text-black">Cover Letter</p>
              <p className="text-xs text-gray-400 font-sans">
                Outstanding cover letter
              </p>
            </div>
          </Link>
          <Link href='/mock-interview' className="h-20 md:h-full min-w-52 flex gap-2 items-center shadow-sm md:shadow-lg border border-gray-100 rounded-lg px-2 hover:scale-105 cursor-pointer">
            <LiaHandshake color="green" size={25} />
            <div>
              <p className="font-sans font-bold text-black">Mock Interview</p>
              <p className="text-xs text-gray-400 font-sans">
                Build confidence & standout
              </p>
            </div>
          </Link>
        </div>
      </div>
      <p className="text-2xl mt-10 text-black font-bold font-sans">
        Interview Tips
      </p>
      <div className="w-full flex flex-col md:flex-row gap-4 flex-wrap flex-1 mt-4">
        {interviewTips?.map((tip: any, index: number) => (
          <div className={`w-full md:w-[24%] animated  wow flash ${colors[Math.floor(Math.random() * 3) + 1]} p-4 min-h-40`} key={index?.toString()}>
            <p className="text-sm text-black font-sans font-bold">{tip?.title}</p>
            {
              tip?.points?.map((point: string) => (
                <p key={point} className="text-sm text-gray-500 mt-2">• {point}</p>
              ))
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
