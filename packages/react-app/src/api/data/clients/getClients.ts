import axios from "axios";

export default async (): Promise<Client[]> => {
  const response = await axios.get("/clients");
  const { data } = response;
  return data;
};
