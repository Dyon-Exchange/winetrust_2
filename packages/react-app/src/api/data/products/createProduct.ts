import axios from "axios";

export default async (newProduct: NewProductForm) => {
  // deconstruct the new product object
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
  } = newProduct;

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
  await axios.post("/products", productFormData);
};
