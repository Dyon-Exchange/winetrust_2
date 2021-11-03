import axios from "axios";

export default async (): Promise<Client[]> => {
  const { data } = await axios.get("/clients");
  return data;
};
