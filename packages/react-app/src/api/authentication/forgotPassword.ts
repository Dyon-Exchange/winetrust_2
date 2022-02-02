import axios from "axios";

export default async (email: string): Promise<any> => {
    const { data } = await axios.post("/admins/forgotpassword", {
        email,
      });
    return data;
  };
  