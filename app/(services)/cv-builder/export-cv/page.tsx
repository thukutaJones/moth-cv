"use client";

import PdfGenerator from "@/components/PdfGenerator";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

const CVBuilder = () => {
  const [template, setTemplate] = useState<string>("");
  const [pageError, setPageError] = useState<string>("");

  useEffect(() => {
    const token: string = localStorage.getItem("moth-cv-token") || "";
    if (!token) {
      window.location.href = "/sign-in";
    }
  }, []);

  return (
    <div>
      <div className="py-4 px-8 flex justify-between items-center">
        <p className="text-black text-2xl font-bold font-sans">Export CV</p>
        <PdfGenerator setPageError={setPageError} template={template} />
      </div>
      {pageError && (
        <p className="p-2 text-center text-red-600 font-sans font-bold">
          {pageError}
        </p>
      )}
      <div className="p-4 md:p-8 flex flex-row flex-wrap gap-2 md:gap-8 flex-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: number) => (
          <div
            key={item.toString()}
            className={`w-[48%] md:w-[17%] p-2 ${
              template === `template_${item}` ? "border-4" : "border"
            } border-blue-600  relative hover:scale-105 cursor-pointer`}
            onClick={() => {
              setTemplate(`template_${item}`);
            }}
          >
            <Image
              src={`/temp_${item}.png`}
              className="w-full h-full"
              width={300}
              height={300}
              alt={`template_${item}`}
            />
            {template === `template_${item}` && (
              <div className="absolute top-2 right-2 bg-blue-600 p-1 rounded-full">
                <FaCheck color="white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVBuilder;
