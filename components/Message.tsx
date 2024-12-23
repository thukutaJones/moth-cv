import React from "react";

const Message = ({ from }: { from: number }) => {
  return (
    <div
      className={`w-full flex ${from % 2 ? "justify-end" : "justify-start"}`}
    >
      <p className="w-[80%] md:w-[48%] text-sm px-4 py-2 bg-white rounded-lg text-gray-600 font-sans">
        bfjhbfhj fjhfbjhff hjbhjhbhhbjhhb hdjbdj dhdbhjdd dhdjbdjbd ddbjdbjdbh
        djdbdhj djdhbjd dhdjb
      </p>
    </div>
  );
};

export default Message;
