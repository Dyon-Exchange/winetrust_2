import axios from "axios";

export default async (): Promise<PreAdvice[]> => {
  const response = await axios.get("/pre-advice");
  const { data } = response;
  return data;
};
