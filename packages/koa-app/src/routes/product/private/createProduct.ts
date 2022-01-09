import multer from "@koa/multer";
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
  
const imageFields : string[] = [
  "product-image",
  "label-image",
  "bottle-image",
  "marketing1-image",
  "marketing2-image",
  "marketing3-image",
  "marketing4-image",
];

const imageFieldsMap = {
  "product-image" : "image",
  "label-image": "labelImage",
  "bottle-image": "bottleImage",
  "marketing1-image": "marketingImage1",
  "marketing2-image": "marketingImage2",
  "marketing3-image": "marketingImage3",
  "marketing4-image": "marketingImage4",
}



export default async (ctx: Context) => {
  // request body in this case is a stringified JSON in a form data object with 'product-data' as it's key
  const requestFiles = JSON.parse(
    JSON.stringify(ctx["files"])
  ) as multer.File[];
  const requestBody = JSON.parse(
    ctx.request["body"]["product-data"]
  ) as CreateProductRequestBody;

  // upload the image file to pinata
  const pinataKey = process.env.PINATA_API_KEY;
  const pinataSecret = process.env.PINATA_API_SECRET;
  
  let imageHashes = []

  for(const imageField of imageFields){
    // console.log(requestFiles[imageField][0]);
    const imageData = new FormData();
    imageData.append("file", Buffer.from(requestFiles[imageField][0]['buffer']), requestFiles[imageField][0].originalname);

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
      imageHashes.push({'field':imageField,'imageHash': imageHash})

      ctx.status = 200;
    } catch (error) {
      ctx.throw(
        500,
        (error as AxiosError).response.data ||
          "Error uploading image file to IPFS"
      );
    }
  }
  
  let images = {}
  for(const imageHash of imageHashes){
    images[imageFieldsMap[imageHash['field']]] = imageHash['imageHash']
  }

  console.log(images)
  console.log(requestBody)
  // save the product in the db
   await Product.create({ ...requestBody, ...images } as ProductClass);
};
