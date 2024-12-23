import Message from "@/components/Message";
import React from "react";

const MockInterview = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full md:w-[60%] h-full">
        <div className="mt-[2%] w-full h-[85%] overflow-y-auto p-4 flex flex-col gap-4 scroll-container">
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((item: number) => (
              <Message from={item} key={item}/>
            ))
          }
        </div>
        <div className="h-[10%] w-full flex items-center justify-center bg-transparent">
          <div className="h-12 w-12 rounded-full bg-red-500 hover:scale-110" />
        </div>
      </div>
    </div>
  );
};

export default MockInterview;
