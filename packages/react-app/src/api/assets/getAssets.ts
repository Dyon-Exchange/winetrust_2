import axios from "axios";

export default async (): Promise<Asset[]> => {
  const { data } = await axios.get("/assets");
  return data;
};
