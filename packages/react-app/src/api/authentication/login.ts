import axios from "axios";

export interface LoginData {
  token: string;
  refreshToken: string;
}

export default async (
  email: string,
  password: string
): Promise<{ token: string; refreshToken: string }> => {
  const response = await axios.post("/admin/login", {
    email,
    password,
  });
  const { token, refreshToken } = response.data as LoginData;

  return { token, refreshToken };
};
