"use server";

import jwt from "jsonwebtoken";

export async function getUserId(token: string) {

  if (!token) {
    console.log("Token not found in URL");
    return null;
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
    };

    console.log("Decoded ID:", decoded?.id);

    return decoded?.id;
  } catch (error) {
    console.log("Failed to decode token:", error);
    return null;
  }
}
