import axios from "axios";

export default async (name: string): Promise<Client[]> => {
  const response = await axios.get(`/clients/search?name=${name}`);
  const { data } = response;
  return data;
};
