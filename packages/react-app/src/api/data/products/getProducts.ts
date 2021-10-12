import axios from "axios";

export default async (): Promise<Product[]> => {
  const { data } = await axios.get("/products");
  return data;
};
