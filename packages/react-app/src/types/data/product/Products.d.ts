type ProductDutyStatus = "In Bond" | "Duty Paid";

interface NewProductForm {
  simpleName: string;
  producerName: string;
  longName: string;
  productId: string;
  description: string;
  year: string;
  region: string;
  subRegion: string;
  subSubRegion: string;
  packSize: string;
  dutyStatus: ProductDutyStatus;
  image?: File;
  labelImage?: File;
  bottleImage?: File;
  marketingImage1?: File;
  marketingImage2?: File;
  marketingImage3?: File;
  marketingImage4?: File;
}

interface Product {
  _id: string;
  productId?: string,
  simpleName: string;
  producerName: string;
  longName: string;
  description: string;
  skuCode?: string;
  year: string;
  region: string;
  subRegion: string;
  subSubRegion: string;
  packSize: string;
  dutyStatus: ProductDutyStatus;
  image?: File;
  labelImage?: File;
  bottleImage?: File;
  marketingImage1?: File;
  marketingImage2?: File;
  marketingImage3?: File;
  marketingImage4?: File;
  createdAt: Date;
  updatedAt: Date;
}
