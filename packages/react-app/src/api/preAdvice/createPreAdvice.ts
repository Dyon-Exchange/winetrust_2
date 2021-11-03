import axios from "axios";
import dayjs from "dayjs";

export default async (newPreAdvice: NewPreAdviceForm) => {
  // build the create pre-advice request body
  const { owner, transferringWarehouse, arrivalWarehouse, assets } =
    newPreAdvice;

  const { _id: ownerId } = owner;
  const { _id: transferringWarehouseId } = transferringWarehouse;
  const { _id: arrivalWarehouseId } = arrivalWarehouse;

  const formattedAssets: NewAssetRequestForm[] = assets.map((asset) => ({
    productId: asset.product._id,
    cost: {
      currency: asset.costPrice.currency,
      amount: parseFloat(asset.costPrice.amount),
    },
    expectedArrivalDate: dayjs(asset.expectedArrivalDate).toDate(),
    quantity: parseInt(asset.quantity, 10),
  }));

  const newPreAdviceRequestBody: CreatePreAdviceRequestBody = {
    ownerId,
    transferringWarehouseId,
    arrivalWarehouseId,
    assets: formattedAssets,
  };

  await axios.post("/pre-advice", newPreAdviceRequestBody);
};
