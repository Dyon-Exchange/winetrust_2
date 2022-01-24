import axios from "axios";

export default async (email: string): Promise<any> => {
    const { data } = await axios.post("/forgotpassword", {
        email,
      });
    return data;
  };
  