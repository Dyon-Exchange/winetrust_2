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
