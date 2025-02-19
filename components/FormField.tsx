import React from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";


const FormField = ({
  wid,
  title,
  placeholder,
  value,
  handleChangeText,
  type,
  textStyles,
  handleHidePassword,
  hidePassword,
}: {
  wid?: string;
  title: string;
  placeholder: string;
  value: string;
  type?: string;
  textStyles?: string;
  handleChangeText: (event: any) => void;
  handleHidePassword?: () => void;
  hidePassword?: boolean;
}) => {
  return (
    <div className={`${wid}`}>
      <label className="text-xs font-sans font-bold text-black">{title}</label>
      <div className={`w-full flex h-10 border border-gray-300`}>
        <input
          required={true}
          type={
            placeholder === "••••••••••••" && hidePassword ? "password" : type
          }
          formNoValidate
          className={`h-full ${
            placeholder === "••••••••••••" ? "w-[85%]" : "w-full"
          } bg-transparent  focus:border-blue-600 outline-none focus:outline-none px-4 ${
            textStyles ? textStyles : "text-sm text-gray-600"
          } `}
          placeholder={placeholder}
          value={value}
          onChange={handleChangeText}
        />
        {placeholder === "••••••••••••" && (
          <button className="w-[15%] flex items-center justify-center h-full" onClick={handleHidePassword}>
            {
              hidePassword ? <FaEye color="white" size={20}/> : <FaEyeSlash color="white" size={20} />
            }
          </button>
        )}
      </div>
    </div>
  );
};

export default FormField;
