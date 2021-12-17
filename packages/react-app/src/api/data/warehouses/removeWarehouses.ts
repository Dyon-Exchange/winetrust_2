import axios from "axios";

export default async (warehouseIds: string[]) => {
  const result = await axios.delete("/warehouses", {
    data: JSON.stringify({ ids: warehouseIds }),
  });
  return result;
};
