import axios from "axios";

export default async (newProduct: NewProductForm) => {
  // deconstruct the new product object
  const {
    simpleName,
    producerName,
    longName,
    productId,
    description,
    year,
    region,
    subRegion,
    subSubRegion,
    packSize,
    dutyStatus,
    image,
    labelImage,
    bottleImage,
    marketingImage1,
    marketingImage2,
    marketingImage3,
    marketingImage4,
  } = newProduct;

  // construct a form data object for the product, so image file can be uploaded
  const productFormData = new FormData();

  // append the image file
  if (image) {
    productFormData.append("product-image", image);
  }
  if (labelImage) {
    productFormData.append("label-image", labelImage);
  }
  if (bottleImage) {
    productFormData.append("bottle-image", bottleImage);
  }
  if (marketingImage1) {
    productFormData.append("marketing1-image", marketingImage1);
  }
  if (marketingImage2) {
    productFormData.append("marketing2-image", marketingImage2);
  }
  if (marketingImage3) {
    productFormData.append("marketing3-image", marketingImage3);
  }
  if (marketingImage4) {
    productFormData.append("marketing4-image", marketingImage4);
  }

  // construct a stringified JSON of the product data to append to the product form data
  const productData = JSON.stringify({
    simpleName,
    producerName,
    longName,
    productId,
    description,
    year,
    region,
    subRegion,
    subSubRegion,
    packSize,
    dutyStatus,
    image,
    labelImage,
    bottleImage,
    marketingImage1,
    marketingImage2,
    marketingImage3,
    marketingImage4,
  });

  productFormData.append("product-data", productData);
  await axios.post("/products", productFormData);
};
