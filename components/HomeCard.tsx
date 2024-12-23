import Image from "next/image";
import React from "react";

const HomeCard = ({ data, index }: { data: any; index: number }) => {
  return (
    <div
      className={`w-full flex flex-col-reverse gap-4 md:gap-0  md:flex-row justify-between mt-20 text-gray-600 md:h-[300px] ${
        index === 1 && "md:flex-row-reverse"
      }`}
    >
      <div className="flex flex-col gap-1 w-full md:w-[55%] h-full items-start">
        <h3 className="text-xl text-black font-bold">{data?.title}</h3>
        <p className="font-sans">{data?.description}</p>
        <button className="px-4 py-2 bg-blue-600 mt-6 rounded-lg">
          <p className="text-sm text-white font-sans">Check it out</p>
        </button>
      </div>
      <Image
        src={data?.image}
        width={300}
        height={300}
        alt="cover pic"
        className="h-full w-full mt-4  md:mt-0 md:w-[35%] rounded-lg"
      />
    </div>
  );
};

export default HomeCard;
