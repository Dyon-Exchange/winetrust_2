import multer from "@koa/multer";
import axios, { AxiosError } from "axios";
import FormData from "form-data";
import { Context } from "koa";

import pinataUrl from "../../../constants/pinataUrl";
import Product, { ProductClass } from "../../../models/Product";

interface CreateProductRequestBody {
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
  dutyStatus: string;
}

const imageFields: string[] = [
  "label-image",
  "bottle-image",
];

const imageFieldsMap = {
  "label-image": "labelImage",
  "bottle-image": "bottleImage",
};

export default async (ctx: Context) => {
  // request body in this case is a stringified JSON in a form data object with 'product-data' as it's key
  const requestFiles = JSON.parse(
    JSON.stringify(ctx.files)
  ) as multer.File[];
  const requestBody = JSON.parse(
    ctx.request.body["product-data"]
  ) as CreateProductRequestBody;

  // upload the image file to pinata
  const pinataKey = process.env.PINATA_API_KEY;
  const pinataSecret = process.env.PINATA_API_SECRET;

  const imageHashes = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const imageField of imageFields) {
    // console.log(requestFiles[imageField][0]);
    if (requestFiles[imageField]) {
      const imageData = new FormData();
      imageData.append(
        "file",
        Buffer.from(requestFiles[imageField][0].buffer),
        requestFiles[imageField][0].originalname
      );

      try {
        // try to upload the image file to pinata
        // eslint-disable-next-line no-await-in-loop
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
        imageHashes.push({ field: imageField, imageHash });

        ctx.status = 200;
      } catch (error) {
        ctx.throw(
          500,
          (error as AxiosError).response.data ||
            "Error uploading image file to IPFS"
        );
      }
    }
  }

  const images = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const imageHash of imageHashes) {
    images[imageFieldsMap[imageHash.field]] = imageHash.imageHash;
  }

  // save the product in the db
  await Product.create({ ...requestBody, ...images } as ProductClass);
};
