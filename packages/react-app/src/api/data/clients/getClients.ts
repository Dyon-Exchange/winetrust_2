import axios from "axios";

export default async (): Promise<Client[]> => {
  const response = await axios.get("/client/get");
  const { data } = response;
  return data;
};
