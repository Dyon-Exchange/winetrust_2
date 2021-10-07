import axios from "axios";

export default async (productName: string): Promise<Product[]> => {
  const response = await axios.get(
    `/warehouses/search?product-name=${productName}`
  );
  const { data } = response;
  return data;
};
