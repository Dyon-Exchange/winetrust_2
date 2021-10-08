import axios from "axios";

export default async (newPreAdvice: NewPreAdviceForm) => {
  // build the create pre-advice request body
  const { owner, transferringWarehouse, arrivalWarehouse } = newPreAdvice;

  const { _id: ownerId } = owner;
  const { _id: transferringWarehouseId } = transferringWarehouse;
  const { _id: arrivalWarehouseId } = arrivalWarehouse;

  const newPreAdviceRequestBody: CreatePreAdviceRequestBody = {
    ownerId,
    transferringWarehouseId,
    arrivalWarehouseId,
  };

  await axios.post("/pre-advice", newPreAdviceRequestBody);
};
