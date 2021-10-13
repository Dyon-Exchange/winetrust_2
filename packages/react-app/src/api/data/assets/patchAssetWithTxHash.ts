import axios from "axios";

interface Props {
  assetId: string;
  txHash: string;
}

export default async ({ assetId, txHash }: Props) => {
  const { data } = await axios.patch(`/assets/${assetId}`, { txHash });

  return data;
};
