import axios from "axios";

export default async (): Promise<Product[]> => {
  const response = await axios.get("/product/get");
  const { data } = response;
  return data;
};
