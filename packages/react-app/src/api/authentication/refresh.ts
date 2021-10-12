import axios from "axios";

import { LoginData } from "./login";

export default async (
  refreshTokenParam: string
): Promise<{ token: string; refreshToken: string }> => {
  const response = await axios.post("/admins/refresh", {
    refreshToken: refreshTokenParam,
  });
  const { token, refreshToken } = response.data as LoginData;

  return { token, refreshToken };
};
