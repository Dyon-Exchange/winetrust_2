import axios from "axios";

export default async (name: string): Promise<Warehouse[]> => {
  const { data } = await axios.get(`/warehouses/search?name=${name}`);
  return data;
};
