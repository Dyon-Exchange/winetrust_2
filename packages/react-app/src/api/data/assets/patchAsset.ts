import axios from "axios";

interface Props {
  assetId: string;
  assetUpdates: Partial<Asset>;
}

export default async ({ assetId, assetUpdates }: Props) => {
  const { data } = await axios.patch(`/assets?asset-id=${assetId}`, {
    assetUpdates,
  });

  return data;
};
