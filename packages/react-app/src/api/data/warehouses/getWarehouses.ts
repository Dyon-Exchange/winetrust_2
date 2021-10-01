import axios from "axios";

export default async (): Promise<Warehouse[]> => {
  const response = await axios.get("/warehouse/get");
  const { data } = response;
  return data;
};
