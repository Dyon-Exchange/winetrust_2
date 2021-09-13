import axios from "axios";

export default async (email: string, password: string): Promise<any> => {
  const response = await axios.post("/admin/login", { email, password });
  console.log(response);
};
