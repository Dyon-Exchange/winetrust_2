import { Request } from "koa";
import { merge } from "lodash";

import returnUpdatedPreAdviceState from "../../../helpers/preAdvice/returnUpdatedPreAdviceState";
import Asset, { AssetClass, AssetState } from "../../../models/Asset";
import PreAdvice from "../../../models/PreAdvice";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface CreateAssetMetadataBody extends Request {
  body: {
    assetUpdates: Partial<AssetClass>;
  };
  query: {
    "asset-id": string;
  };
}

export default async (ctx: ExtendedContext<CreateAssetMetadataBody>) => {
  const assetId = ctx.request.query["asset-id"];

  const asset = await Asset.findById(assetId);

  if (ctx.request.body.assetUpdates.state) {
    const preAdviceClass = await PreAdvice.findById(asset.preAdvice);

    preAdviceClass.state = await returnUpdatedPreAdviceState(
      assetId,
      preAdviceClass
    );

    await preAdviceClass.save();
  }

  if (ctx.request.body.assetUpdates.txHash) {
    asset.state = AssetState.Tokenised;
  }

  const mergedAsset = merge(
    asset.toObject(),
    ctx.request.body.assetUpdates
  ) as AssetClass;

  await Asset.findByIdAndUpdate(assetId, mergedAsset);

  ctx.status = 200;
};
