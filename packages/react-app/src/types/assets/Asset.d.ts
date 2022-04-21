interface NewAssetForm {
  key: string;
  product: Product;
  costPrice: {
    currency: string;
    amount: string;
  };
  expectedArrivalDate: string;
  quantity: string;
}

interface NewAssetRequestForm {
  productId: string;
  cost: {
    currency: string;
    amount: number;
  };
  expectedArrivalDate: Date;
  quantity: number;
}

type AssetState = "Due In" | "Landed" | "Tokenised";

interface Asset {
  _id: string;
  assetId: string;
  preAdvice: PreAdvice;
  product: Product;
  cost: {
    currency: string;
    amount: number;
  };
  expectedArrivalDate: Date;
  state: AssetState;
  initialConditionText?: string;
  initialConditionReport?: string;
  initialConditionReport2?: string;
  initialConditionReport3?: string;
  initialConditionReport4?: string;
  initialConditionReport5?: string;
  initialConditionReport6?: string;
  tokenId?: number;
  txHash?: string;
  warehouseLocationNo?: string;
  landedAt?: Date;
  tokenisedAt?: Date;
}
