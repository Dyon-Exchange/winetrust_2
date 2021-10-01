import axios from "axios";

export default async (): Promise<Product[]> => {
  const response = await axios.get("/products");
  const { data } = response;
  return data;
};
