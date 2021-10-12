import axios from "axios";

import { LoginData } from "./login";

export default async (
  refreshTokenParam: string
): Promise<{ token: string; refreshToken: string }> => {
  const {
    data: { token, refreshToken },
  } = await axios.post("/admins/refresh", {
    refreshToken: refreshTokenParam,
  });

  return { token, refreshToken };
};
