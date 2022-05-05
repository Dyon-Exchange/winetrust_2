type ProductDutyStatus = "In Bond" | "Duty Paid";

interface NewProductForm {
  simpleName: string;
  producerName: string;
  longName: string;
  productCode: number;
  description: string;
  year: string;
  country: string;
  region: string;
  subRegion?: string;
  subSubRegion?: string;
  packSize: string;
  dutyStatus: ProductDutyStatus;
  labelImage?: File;
  bottleImage?: File;
}

interface Product {
  _id: string;
  simpleName: string;
  producerName: string;
  longName: string;
  productCode: number;
  description: string;
  skuCode?: string;
  year: string;
  country: string;
  region: string;
  subRegion?: string;
  subSubRegion?: string;
  packSize: string;
  dutyStatus: ProductDutyStatus;
  labelImage?: File;
  bottleImage?: File;
  createdAt: Date;
  updatedAt: Date;
}
