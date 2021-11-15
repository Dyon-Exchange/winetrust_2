import axios from "axios";

import { AuthData } from "./authenticate";

export default async (refreshTokenParam: string): Promise<AuthData> => {
  const { data } = await axios.post("/admins/refresh", {
    refreshToken: refreshTokenParam,
  });
  return data;
};
