import React from "react";
import { IoClose } from "react-icons/io5";

const UploadDeleteImage = ({
  handleUpload,
  handleDelete,
  handleClose
}: {
  handleUpload: () => void;
  handleDelete: () => void;
  handleClose: () => void;
}) => {
  return (
    <div className="absolute top-0 left-0 bg-white bg-opacity-70 w-full h-full z-40 flex items-center justify-center">
      <div className="w-[90%] md:w-[40%] p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-black font-sans">
            Upload or Delete ?
          </p>
          <div
            className="bg-green-500 p-1 rounded-full cursor-pointer"
            onClick={handleClose}
          >
            <IoClose size={20} />
          </div>
        </div>
        <div className="mt-16 w-full flex gap-4 justify-end items-center">
          <div
            className="px-4 border border-red-600 rounded-full py-1 text-red-600 cursor-pointer hover:scale-105"
            onClick={handleDelete}
          >
            Delete
          </div>
          <div
            className="px-4 bg-green-500 text-white py-1 rounded-full cursor-pointer hover:scale-105"
            onClick={handleUpload}
          >
            Upload
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDeleteImage;
