import axios from "axios";

export default async (): Promise<Asset[]> => {
  const { data } = await axios.get("/assets");
  const assets: Asset[] = data;
  const filteredAssets = assets.filter(
    (a) => a.product != null && a.preAdvice != null
  );
  console.log(filteredAssets);
  return filteredAssets;
};
