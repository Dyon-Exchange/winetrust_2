import axios from "axios";

export default async (): Promise<Asset[]> => {
  const response = await axios.get("/assets");
  const { data } = response;
  return data;
};
