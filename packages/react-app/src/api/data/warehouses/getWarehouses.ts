import axios from "axios";

export default async (): Promise<Warehouse[]> => {
  const { data } = await axios.get("/warehouses");
  return data;
};
