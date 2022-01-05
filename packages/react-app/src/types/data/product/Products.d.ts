type ProductDutyStatus = "In Bond" | "Duty Paid";

interface NewProductForm {
  simpleName: string;
  productName: string;
  description: string;
  year: string;
  region: string;
  subRegion?: string;
  subSubRegion?: string;
  packSize: string;
  dutyStatus: ProductDutyStatus;
  image: File;
}

interface Product {
  _id: string;
  simpleName: string;
  productName: string;
  description: string;
  skuCode?: string;
  year: string;
  region: string;
  subRegion?: string;
  subSubRegion?: string;
  packSize: string;
  dutyStatus: ProductDutyStatus;
  image: File;
  createdAt: Date;
  updatedAt: Date;
}
