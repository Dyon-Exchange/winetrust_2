import axios, { AxiosError } from "axios";
import FormData from "form-data";
import { Context } from "koa";

import pinataUrl from "../../../constants/pinataUrl";
import Product, { ProductClass } from "../../../models/Product";

interface CreateProductRequestBody {
  simpleName: string;
  productName: string;
  longName: string;
  productId: string;
  description: string;
  year: string;
  region: string;
  subRegion?: string;
  subSubRegion?: string;
  packSize: string;
  dutyStatus: string;
}

export default async (ctx: Context) => {
  // request body in this case is a stringified JSON in a form data object with 'product-data' as it's key
  const requestFiles = ctx.request.files;
  const requestBody = JSON.parse(
    ctx.request["body"]["product-data"]
  ) as CreateProductRequestBody;

  // upload the image file to pinata
  const pinataKey = process.env.PINATA_API_KEY;
  const pinataSecret = process.env.PINATA_API_SECRET;

  const imageData = new FormData();
  imageData.append("file", requestFiles[0].buffer, requestFiles[0].originalname);

  try {
    // try to upload the image file to pinata
    const response = await axios.post(
      `${pinataUrl}/pinning/pinFileToIPFS`,
      imageData,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${imageData.getBoundary()}`,
          pinata_api_key: pinataKey,
          pinata_secret_api_key: pinataSecret,
        },
      }
    );

    // get the image IPFS hash from response
    const imageHash = response.data.IpfsHash;

    // save the product in the db
    await Product.create({ ...requestBody, image: imageHash } as ProductClass);

    ctx.status = 200;
  } catch (error) {
    ctx.throw(
      500,
      (error as AxiosError).response.data ||
        "Error uploading image file to IPFS"
    );
  }
};
