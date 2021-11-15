import multer from "@koa/multer";
import axios from "axios";
import FormData from "form-data";

import pinataUrl from "../constants/pinataUrl";

export default async (fileContent: multer.File) => {
  const uploadData = new FormData();

  uploadData.append("file", fileContent.buffer, fileContent.originalname);

  const response = await axios.post(
    `${pinataUrl}/pinning/pinFileToIPFS`,
    uploadData,
    {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${uploadData.getBoundary()}`,
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_API_SECRET,
      },
    }
  );

  return response.data.IpfsHash;
};
