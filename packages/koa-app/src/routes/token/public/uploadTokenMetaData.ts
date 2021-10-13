import axios from "axios";
import { Context } from "koa";

export default async (ctx: Context) => {
  const pinataKey = process.env.PINATA_API_KEY;
  const pinataSecret = process.env.PINATA_API_SECRET;

  const pinataUrl = "https://api.pinata.cloud";

  // Mint to Asset -> Preadvice -> ethAddress

  const response = await axios.post(
    `${pinataUrl}/pinning/pinJSONToIPFS`,
    // This request body is following the opensea meta data standard found here: https://docs.opensea.io/docs/metadata-standards
    {
      pinataContent: {
        // Product-> ProductName
        name: "Wine",
        // Field on the product -> Product -> description
        description: "Rare bottle of wine",
        // Product -> Image
        image: "ipfs://QmSqvqPkDVtEJmsV3tK7dkoDo3QGKZjRJ74pE2bhZohkX1",
        // TODO what to do, could be in selector form, leave it out
        background_color: "800000",
        // The pdf file for IPFS
        initial_condition_report:
          "https://cdn.shopify.com/s/files/1/0947/5526/products/2000cissac_500x.jpg?v=1624116754",
        // TODO what will this be? Field on the mint form
        external_url: "https://winetrust.vercel.app",
        attributes: [
          // Product -> skuCode
          {
            trait_type: "SKU Code",
            value: "872365872152762946",
          },
          // TODO check with jacob, could just be the model one. Asset -> _id
          {
            trait_type: "ID Number",
            value: "000001",
          },
          // Produuct -> year
          // All from product modal
          {
            trait_type: "Year",
            value: "1609",
          },
          {
            trait_type: "Region",
            value: "Eastern Europe",
          },
          {
            trait_type: "Sub-Region",
            value: "",
          },
          {
            trait_type: "Sub-Sub-Region",
            value: "",
          },
          {
            trait_type: "Pack Size",
            value: "6x32cl",
          },
          {
            trait_type: "Duty Status",
            value: "In Bond",
          },
          // Preadvice -> arrivalWarehouse -> _id
          {
            trait_type: "Warehouse ID",
            value: "000001",
          },
        ],
      },
      pinataMetadata: {
        // Asset -> _id
        name: "TestTokenMetaData",
      },
    },
    {
      headers: {
        pinata_api_key: pinataKey,
        pinata_secret_api_key: pinataSecret,
      },
    }
  );

  ctx.body = { token: response.data.IpfsHash };
};
