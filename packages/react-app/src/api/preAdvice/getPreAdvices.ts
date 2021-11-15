import axios from "axios";

export default async (): Promise<PreAdvice[]> => {
  const { data } = await axios.get("/pre-advice");
  return data;
};
