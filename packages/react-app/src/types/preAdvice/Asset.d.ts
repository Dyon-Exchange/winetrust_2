interface NewAssetFormCostPrice {
  currency: string;
  amount: string;
}

interface NewAssetForm {
  key: string;
  product: Product;
  costPrice: NewAssetFormCostPrice;
  expectedArrivalDate: string;
  quantity: string;
}
