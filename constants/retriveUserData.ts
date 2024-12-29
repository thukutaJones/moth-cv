import axios from "axios";

import { baseUrl } from "./baseUrl";
import { getUserIdFromCookie } from "./getUserId";

export const retriveUserData = async () => {
  const userId = await getUserIdFromCookie();
  console.log(userId)
  try {
    
      const res = await axios.get(
        `${baseUrl}/api/me/${userId}`,
        { withCredentials: true }
      );
      const user = res?.data?.user;
      console.log(res?.data?.user);
    
      return user;
  } catch (error: any ) {
    console.log(error.message)
  }
};
