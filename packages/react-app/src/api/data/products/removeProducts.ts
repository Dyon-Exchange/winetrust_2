import axios from "axios";

export default async (productIds: string[]) => {
  const result = await axios.delete("/products", {
    data: JSON.stringify(productIds),
  });
  return result;
};
