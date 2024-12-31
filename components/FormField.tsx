import React from "react";

const FormField = ({
  wid,
  title,
  placeholder,
  value,
  handleChangeText,
  type,
}: {
  wid?: string;
  title: string;
  placeholder: string;
  value: string;
  type?: string;
  handleChangeText: (event: any) => void;
}) => {
  return (
    <div className={`${wid}`}>
      <label className="text-xs font-sans font-bold text-black">{title}</label>
      <input
        required={true}
        type={type}
        formNoValidate
        className="w-full h-10 bg-transparent border border-gray-300 focus:border-blue-600 outline-none focus:outline-none px-4 text-sm text-gray-600"
        placeholder={placeholder}
        value={value}
        onChange={handleChangeText}
      />
    </div>
  );
};

export default FormField;
