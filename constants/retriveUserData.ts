import axios from "axios";

import { baseUrl } from "./baseUrl";
import { getUserIdFromCookie } from "./getUserId";

export const retriveUserData = async () => {
  const userId = await getUserIdFromCookie();
  try {
    const res = await axios.get(`${baseUrl}/api/me/${userId}`, {
      withCredentials: true,
    });
    const user = res?.data?.user;

    return user;
  } catch (error: any) {}
};
