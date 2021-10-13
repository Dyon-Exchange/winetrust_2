import axios from "axios";

export default async (newProduct: NewProductForm) => {
  // deconstruct the new product object
  const {
    productName,
    year,
    region,
    subRegion,
    subSubRegion,
    packSize,
    dutyStatus,
    image,
    description,
  } = newProduct;

  // construct a form data object for the product, so image file can be uploaded
  const productFormData = new FormData();

  // append the image file
  productFormData.append("product-image", image);

  // construct a stringified JSON of the product data to append to the product form data
  const productData = JSON.stringify({
    productName,
    year,
    region,
    subRegion,
    subSubRegion,
    packSize,
    dutyStatus,
    description,
  });

  productFormData.append("product-data", productData);

  await axios.post("/products", productFormData);
};
