import Asset, { AssetState } from "../../models/Asset";
import { PreAdviceClass, PreAdviceState } from "../../models/PreAdvice";

export default async (
  assetIdToUpdate: string,
  preAdviceClass: PreAdviceClass & { _id: string }
): Promise<PreAdviceState> => {
  const assetsUnderPreAdvice = await Asset.find({
    preAdvice: preAdviceClass._id,
  });

  const hasRemainingDueInAsset = assetsUnderPreAdvice.some(
    (asset) =>
      asset.state === AssetState.DueIn &&
      asset._id.toString() !== assetIdToUpdate
  );

  if (hasRemainingDueInAsset) return PreAdviceState.PartLanded;

  return PreAdviceState.Landed;
};
