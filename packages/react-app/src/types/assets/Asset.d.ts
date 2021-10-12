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
  preAdvice: PreAdvice;
  product: Product;
  cost: {
    currency: string;
    amount: number;
  };
  expectedArrivalDate: Date;
  state: AssetState;
}
