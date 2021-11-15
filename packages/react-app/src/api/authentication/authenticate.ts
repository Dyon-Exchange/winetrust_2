import axios from "axios";

export interface AuthData {
  token: string;
  refreshToken: string;
}

export const loginRequest = async (email: string, password: string): Promise<AuthData> => {
  const { data } = await axios.post("/admins/login", {
    email,
    password,
  });
  return data;
};

export const signupRequest = async (email: string, password: string): Promise<AuthData> => {
  const { data } = await axios.post("/admins/signup", {
    email,
    password,
  });
  return data;
};
