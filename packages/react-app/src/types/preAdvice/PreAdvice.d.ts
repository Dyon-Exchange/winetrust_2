interface NewPreAdviceForm {
  owner: Client;
  transferringWarehouse: Warehouse;
  arrivalWarehouse: Warehouse;
  assets: NewAssetForm[];
}

interface CreatePreAdviceRequestBody {
  ownerId: string;
  transferringWarehouseId: string;
  arrivalWarehouseId: string;
}
