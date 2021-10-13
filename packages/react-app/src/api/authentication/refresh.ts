import axios from "axios";

import { LoginData } from "./login";

export default async (refreshTokenParam: string): Promise<LoginData> => {
  const { data } = await axios.post("/admins/refresh", {
    refreshToken: refreshTokenParam,
  });
  return data;
};
