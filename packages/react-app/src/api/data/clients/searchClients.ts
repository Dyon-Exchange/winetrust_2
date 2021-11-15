import axios from "axios";

export default async (name: string): Promise<Client[]> => {
  const { data } = await axios.get(`/clients/search?name=${name}`);
  return data;
};
