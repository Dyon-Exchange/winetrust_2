import axios from "axios";

export interface LoginData {
  token: string;
  refreshToken: string;
}

export default async (email: string, password: string): Promise<LoginData> => {
  const { data } = await axios.post("/admins/login", {
    email,
    password,
  });
  return data;
};
