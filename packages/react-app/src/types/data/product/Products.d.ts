type ProductDutyStatus = "In Bond" | "Duty Paid";

interface NewProductForm {
  simpleName: string;
  producerName: string;
  longName: string;
  productCode: number;
  description: string;
  year: string;
  region: string;
  subRegion: string;
  subSubRegion?: string;
  packSize: string;
  dutyStatus: ProductDutyStatus;
  image?: File;
  labelImage?: File;
  labelImage2?: File;
  bottleImage?: File;
  bottleImage2?: File;
  marketingImage1?: File;
  marketingImage2?: File;
  marketingImage3?: File;
  marketingImage4?: File;
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
  region: string;
  subRegion: string;
  subSubRegion?: string;
  packSize: string;
  dutyStatus: ProductDutyStatus;
  image?: File;
  labelImage?: File;
  labelImage2?: File;
  bottleImage?: File;
  bottleImage2?: File;
  marketingImage1?: File;
  marketingImage2?: File;
  marketingImage3?: File;
  marketingImage4?: File;
  createdAt: Date;
  updatedAt: Date;
}
