"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUserIdFromCookie() {
  console.log('in')
  const token = (await cookies()).get("moth-cv-token")?.value;

  if (!token) {
    console.log('token not found')
    return null;
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
    };

    console.log(decoded?.id)

    return decoded?.id;
  } catch (error) {
    console.log("Failed to decode token:", error);
    return null;
  }
}
