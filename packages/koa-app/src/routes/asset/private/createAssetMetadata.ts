import axios, { AxiosError } from "axios";
import FormData from "form-data";
import { Context } from "koa";

import pinataUrl from "../../../constants/pinataUrl";
import uploadFileToIPFS from "../../../helpers/uploadFileToIPFS";
import Product, { ProductClass } from "../../../models/Product";

interface CreateAssetMetadataBody {
  externalURL: string;
  assetId: string;
}

export default async (ctx: Context) => {
  // request body in this case is a stringified JSON in a form data object with 'product-data' as it's key
  const initialConditionReport = ctx.request.file;

  console.log(initialConditionReport);

  const { externalURL, assetId } = ctx.request.body as CreateAssetMetadataBody;

  // const imageData = new FormData();
  // imageData.append(
  //   "file",
  //   initialConditionReport.buffer,
  //   initialConditionReport.originalname
  // );

  //   Hash the PDF file
  // Hash all the metadata
  // Return the metadata hash to the frontend

  //   Potentially sign the tx on the frontend and send the signed tx to the backend, which executes it and waits for the tx hash

  try {
    // const initialConditionReportHash = await uploadFileToIPFS(
    //   initialConditionReport
    // );
    const initialConditionReportHash =
      "QmbGg2TePa9LUV9ghADvpQwCTbUGPQJPBg7uND9ZLjtgn4";

    // Uploaded files hash QmbGg2TePa9LUV9ghADvpQwCTbUGPQJPBg7uND9ZLjtgn4
    console.log(initialConditionReportHash);
    // // try to upload the image file to pinata
    // const response = await axios.post(
    //   `${pinataUrl}/pinning/pinFileToIPFS`,
    //   imageData,
    //   {
    //     maxBodyLength: Infinity,
    //     headers: {
    //       "Content-Type": `multipart/form-data; boundary=${imageData.getBoundary()}`,
    //       pinata_api_key: pinataKey,
    //       pinata_secret_api_key: pinataSecret,
    //     },
    //   }
    // );

    // // get the image IPFS hash from response
    // const imageHash = response.data.IpfsHash;

    // ctx.status = 200;
    ctx.status = 404;
  } catch (error) {
    console.log(error);
    ctx.throw(
      500,
      (error as AxiosError).response?.data ||
        "Error uploading image file to IPFS"
    );
  }
};
