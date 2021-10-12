import axios from "axios";

export default async (productName: string): Promise<Product[]> => {
  const { data } = await axios.get(
    `/products/search?product-name=${productName}`
  );
  return data;
};
