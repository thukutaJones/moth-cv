"use client";

import FormField from "@/components/FormField";
import Image from "next/image";
import React, { useState } from "react";

interface FormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  nationality: string;
  address: string;
}

const PersonalDetails = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    fullName: "",
    email: "",
    phoneNumber: "",
    nationality: "",
    address: "",
  });
  return (
    <div className="p-4 md:px-8 flex md:flex-row">
      <section className="w-full md:w-[60%]">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-xl md:text-2xl text-black font-sans font-bold">
            Personal Details
          </h2>
          <div className="md:hidden px-4 py-1 bg-green-500 rounded-lg">
            <p>Preview</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col md:flex-row mt-4 gap-8 items-center md:items-start ">
            <Image
              src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              width={300}
              height={300}
              alt="profile_pic"
              className="w-28 h-28 rounded-full border-2 cursor-pointer"
            />
            <div className="w-full">
              <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between w-full px-4">
                <FormField
                  wid="w-full md:w-[48%]"
                  title="Full name"
                  placeholder="Jones Thukuta"
                  value={formValues.fullName}
                  handleChangeText={(event: any) =>
                    setFormValues({
                      ...formValues,
                      fullName: event.target.value,
                    })
                  }
                />
                <FormField
                  wid="w-full md:w-[48%]"
                  title="E-mail"
                  type="email"
                  placeholder="yourname@example.com"
                  value={formValues.email}
                  handleChangeText={(event: any) =>
                    setFormValues({
                      ...formValues,
                      email: event.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-4 mt-4 md:gap-0 md:flex-row justify-between w-full px-4">
                <FormField
                  wid="w-full md:w-[48%]"
                  title="Phone number"
                  placeholder="0888941871"
                  type="number"
                  value={formValues.phoneNumber}
                  handleChangeText={(event: any) =>
                    setFormValues({
                      ...formValues,
                      phoneNumber: event.target.value,
                    })
                  }
                />
                <FormField
                  wid="w-full md:w-[48%]"
                  title="Nationality"
                  placeholder="Malawian"
                  value={formValues.nationality}
                  handleChangeText={(event: any) =>
                    setFormValues({
                      ...formValues,
                      nationality: event.target.value,
                    })
                  }
                />
              </div>
              <div className="px-4">
                <FormField
                  wid="w-full mt-4"
                  title="Address"
                  type="address"
                  placeholder="P/Box 201, Luwinga, Mzuzu"
                  value={formValues.address}
                  handleChangeText={(event: any) =>
                    setFormValues({
                      ...formValues,
                      address: event.target.value,
                    })
                  }
                />
              </div>
              <div className="mt-20 flex justify-between px-4">
                <div className="border-2 px-10 py-2 border-gray-500 cursor-pointer hover:scale-105">
                  <p className="text-gray-500 font-sans font-bold">Back</p>
                </div>
                <div className="border-2 px-10 py-2 bg-blue-600 cursor-pointer hover:scale-105">
                  <p className="text-white font-sans font-bold">Continue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="hidden md:flex w-[40%] border border-black min-h-[calc(100vh-150px)]"></section>
    </div>
  );
};

export default PersonalDetails;
