type ProductDutyStatus = "In Bond" | "Duty Paid";

interface NewProductForm {
  productName: string;
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
  productName: string;
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
