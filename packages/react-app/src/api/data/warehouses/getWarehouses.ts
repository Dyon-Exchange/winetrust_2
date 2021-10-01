import axios from "axios";

export default async (): Promise<Warehouse[]> => {
  const response = await axios.get("/warehouses");
  const { data } = response;
  return data;
};
