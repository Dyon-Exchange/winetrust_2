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
  assets: NewAssetRequestForm[];
}

type PreAdviceState = "Due In" | "Part Landed" | "Landed";

interface PreAdvice {
  _id: string;
  owner: Client;
  transferringWarehouse: Warehouse;
  arrivalWarehouse: Warehouse;
  state: PreAdviceState;
}
