import axios from "axios";
import { Context } from "koa";

export default async (ctx: Context) => {
  const pinataKey = process.env.PINATA_API_KEY;
  const pinataSecret = process.env.PINATA_API_SECRET;

  const pinataUrl = "https://api.pinata.cloud";

  const response = await axios.post(
    `${pinataUrl}/pinning/pinJSONToIPFS`,
    // This request body is following the opensea meta data standard found here: https://docs.opensea.io/docs/metadata-standards
    {
      name: "Wine",
      description: "Rare bottle of wine",
      image: "ipfs://QmSqvqPkDVtEJmsV3tK7dkoDo3QGKZjRJ74pE2bhZohkX1",
      background_color: "800000",
      initial_condition_report:
        "https://cdn.shopify.com/s/files/1/0947/5526/products/2000cissac_500x.jpg?v=1624116754",
      external_url: "https://winetrust.vercel.app",
      attributes: [
        {
          trait_type: "SKU Code",
          value: "872365872152762946",
        },
        {
          trait_type: "ID Number",
          value: "000001",
        },
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
        {
          trait_type: "Warehouse ID",
          value: "000001",
        },
      ],
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
