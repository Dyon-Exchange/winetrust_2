import axios from "axios";

export default async (longName: string): Promise<Product[]> => {
  const { data } = await axios.get(
    `/products/search?long-name=${longName}`
  );
  return data;
};
