interface NewWarehouseForm {
  warehouseName: string;
  warehouseAddress: string;
  contactName: string;
  contactEmail: string;
}

interface Warehouse {
  _id: string;
  name: string;
  address: string;
  contactName: string;
  contactEmail: string;
  createdAt: Date;
  updatedAt: Date;
}
