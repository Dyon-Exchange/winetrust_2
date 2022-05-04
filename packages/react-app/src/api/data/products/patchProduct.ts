import axios from "axios";

interface Props {
  productId: string;
  updates: NewProductForm;
}

export default async ({ productId, updates }: Props) => {
  const {
    simpleName,
    producerName,
    longName,
    productCode,
    description,
    year,
    country,
    region,
    subRegion,
    subSubRegion,
    packSize,
    dutyStatus,
    labelImage,
    bottleImage,
  } = updates;

  // construct a form data object for the product, so image file can be uploaded
  const productFormData = new FormData();

  // append the image file
 
  if (labelImage) {
    productFormData.append("label-image", labelImage);
  }
  
  if (bottleImage) {
    productFormData.append("bottle-image", bottleImage);
  }
  
  // construct a stringified JSON of the product data to append to the product form data
  const productData = JSON.stringify({
    simpleName,
    producerName,
    longName,
    productCode,
    description,
    year,
    country,
    region,
    subRegion,
    subSubRegion,
    packSize,
    dutyStatus,
    labelImage,
    bottleImage,
  });

  productFormData.append("product-data", productData);
  await axios.patch(`/products/${productId}`, productFormData);
};
