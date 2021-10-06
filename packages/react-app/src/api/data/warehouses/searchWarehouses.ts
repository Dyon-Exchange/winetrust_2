import axios from "axios";

export default async (name: string): Promise<Warehouse[]> => {
  const response = await axios.get(`/warehouses/search?name=${name}`);
  const { data } = response;
  return data;
};
