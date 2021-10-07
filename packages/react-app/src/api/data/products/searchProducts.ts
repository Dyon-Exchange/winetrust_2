import axios from "axios";

export default async (productName: string): Promise<Product[]> => {
  const response = await axios.get(
    `/products/search?product-name=${productName}`
  );
  const { data } = response;
  return data;
};
