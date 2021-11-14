import axios from "axios";

export default async (clientIds: string[]) => {
  const result = await axios.delete("/clients", {
    data: JSON.stringify({ ids: clientIds }),
  });
  return result;
};
