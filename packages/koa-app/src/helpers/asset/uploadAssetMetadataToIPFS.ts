import axios from "axios";

import pinataUrl from "../../constants/pinataUrl";
import { ProductClass } from "../../models/Product";
import { WarehouseClass } from "../../models/Warehouse";

type ClassWithId<T> = T & { _id: string };

const formatAssetMetadata = (
  assetId: string,
  product: ProductClass,
  arrivalWarehouse: ClassWithId<WarehouseClass>,
  imageHash: string,
  initialConditionReportHash: string,
  externalURL: string
) => ({
  pinataContent: {
    name: product.simpleName,
    description: product.description,
    image: `ipfs://${imageHash}`,
    initial_condition_report: `ipfs://${initialConditionReportHash}`,
    external_url: externalURL,
    attributes: [
      // {
      //   trait_type: "SKU Code",
      //   value: product.skuCode ?? "",
      // },
      {
        trait_type: "Asset ID",
        value: assetId,
      },
      {
        trait_type: "Year",
        value: product.year,
      },
      {
        trait_type: "Country",
        value: product.country,
      },
      {
        trait_type: "Region",
        value: product.region,
      },
      {
        trait_type: "Sub Region",
        value: product.subRegion,
      },
      // {
      //   trait_type: "Sub-Sub-Region",
      //   value: product.subSubRegion,
      // },
      {
        trait_type: "Pack Size",
        value: product.packSize,
      },
      // {
      //   trait_type: "Duty Status",
      //   value: product.dutyStatus,
      // },
      {
        trait_type: "Warehouse Name",
        value: arrivalWarehouse.name,
      },
    ],
  },
  pinataMetadata: {
    name: assetId,
  },
});

export default async (
  assetId: string,
  product: ProductClass,
  arrivalWarehouse: ClassWithId<WarehouseClass>,
  imageHash: string,
  initialConditionReportHash: string,
  externalURL: string
) => {
  const response = await axios.post(
    `${pinataUrl}/pinning/pinJSONToIPFS`,
    // This request body is following the opensea meta data standard found here: https://docs.opensea.io/docs/metadata-standards
    formatAssetMetadata(
      assetId,
      product,
      arrivalWarehouse,
      imageHash,
      initialConditionReportHash,
      externalURL
    ),
    {
      headers: {
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_API_SECRET,
      },
    }
  );

  return response.data.IpfsHash;
};
