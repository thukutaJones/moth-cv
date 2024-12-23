"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const CVBuilder = () => {
  const router = useRouter();
  return (
    <div className="p-4 md:p-8 flex flex-row flex-wrap gap-2 md:gap-8 flex-1">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: number) => (
        <div
          key={item.toString()}
          className="w-[48%] md:w-[23%] p-2 border border-blue-600  relative hover:scale-105 cursor-pointer"
          onClick={() => {
            localStorage.setItem("template", `template_${item}`);
            router.push("/cv-builder/personal-details");
          }}
        >
          <Image
            src={`/temp_${item}.png`}
            className="w-full h-full"
            width={300}
            height={300}
            alt={`template_${item}`}
          />
        </div>
      ))}
    </div>
  );
};

export default CVBuilder;
