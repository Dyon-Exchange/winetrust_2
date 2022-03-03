import { Storage } from "@google-cloud/storage";
import multer from "@koa/multer";

const storage = new Storage({ keyFilename: "cloud-storage.json" });
const bucketName = "winetrust_org";

export default async (fileContent: multer.File, fileName: string) => {
  await storage.bucket(bucketName).file(fileName).save(fileContent.buffer);

  return `https://storage.googleapis.com/${bucketName}/${fileName}`;
};
