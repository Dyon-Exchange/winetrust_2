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
      image: "www.image.com",
      background_color: "#FF0000",
      attributes: {
        sku_code: "123456",
        id_number: "123456",
        year: "1609",
        region: "Eastern Europe",
        sub_region: "",
        sub_sub_region: "",
        pack_size: "big",
        duty_status: "yes",
        warehouse_id: "123456",
        condition_report: "www.condition.com",
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
