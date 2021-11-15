import axios from "axios";

export default async (newWarehouse: NewWarehouseForm) => {
  await axios.post("/warehouses", newWarehouse);
};
