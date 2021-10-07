interface NewAssetFormCostPrice {
  currency: string;
  amount: string;
}

interface NewAssetForm {
  product: Product;
  costPrice: NewAssetFormCostPrice;
  expectedArrivalDate: string;
  quantity: string;
}
