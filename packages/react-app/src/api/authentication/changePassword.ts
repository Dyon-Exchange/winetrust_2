import axios, { AxiosRequestConfig } from "axios";

export default async (password: string,token:string): Promise<any> => {
    const config : AxiosRequestConfig = {
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await axios.put("/admins/changepassword", {
        password,
      },config);
    return data;
  };
  