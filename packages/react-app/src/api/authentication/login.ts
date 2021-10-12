import axios from "axios";

export interface LoginData {
  token: string;
  refreshToken: string;
}

export default async (
  email: string,
  password: string
): Promise<{ token: string; refreshToken: string }> => {
  const {
    data: { token, refreshToken },
  } = await axios.post("/admins/login", {
    email,
    password,
  });

  return { token, refreshToken };
};
