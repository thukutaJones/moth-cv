"use client";

import React, { useState } from "react";

const Message = ({ data }: { data: { role: string; content: string } }) => {
  return (
    <div
      className={`w-full flex ${
        data?.role === "system" ? "justify-start" : "justify-end"
      }`}
    >
      <p className="w-[80%] md:w-[60%] text-sm px-4 py-2 bg-white rounded-lg text-gray-600 font-sans">
        {data?.content}
      </p>
    </div>
  );
};

export default Message;
