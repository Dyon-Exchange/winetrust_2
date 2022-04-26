import { AutoIncrementIDOptions, AutoIncrementIDTrackerSpecDoc } from "@typegoose/auto-increment";
import { logger } from "@typegoose/typegoose/lib/logSettings";
import { crc8 } from "crc";
import * as mongoose from "mongoose";


const DEFAULT_INCREMENT = 1;


/**
 * Because since node 4.0.0 the internal util.is* functions got deprecated
 * @param val Any value to test if null or undefined
 */
export function isNullOrUndefined(val: unknown): val is null | undefined {
  return val === null || val === undefined;
}

/** The Schema used for the trackers */
const IDSchema = new mongoose.Schema<AutoIncrementIDTrackerSpecDoc>(
  {
    field: String,
    // @ts-expect-error somehow "modelName" gets removed from the type
    modelName: String,
    count: Number,
  },
  { versionKey: false }
);
IDSchema.index({ field: 1, modelName: 1 }, { unique: true });

export const AutoIncrementIDSkipSymbol = Symbol("AutoIncrementIDSkip");

/**
 * The Plugin - ID
 * Increments an counter in an tracking collection
 * @param schema The Schema
 * @param options The Options
 */
export function AutoIncrementAssetID(schema: mongoose.Schema<any>): void {
  /** The Options with default options applied */
  const opt: Required<AutoIncrementIDOptions> = {
    field: "assetId",
    incrementBy: DEFAULT_INCREMENT,
    trackerCollection: "identitycounters",
    trackerModelName: "identitycounter",
    startAt: 0,
  };

  let model: mongoose.Model<AutoIncrementIDTrackerSpecDoc>;

  logger.info("AutoIncrementAssetID called with options %O", opt);

  schema.pre("save", async function AutoIncrementPreSaveID(): Promise<void> {
    logger.info("AutoIncrementAssetID PreSave");

    const { modelName } = this.constructor as any;

    if (!model) {
      logger.info("Creating idtracker model named \"%s\"", opt.trackerModelName);
      // needs to be done, otherwise "undefiend" error if the plugin is used in an sub-document
      const db: mongoose.Connection = this.db ?? (this as any).ownerDocument().db;
      model = db.model<AutoIncrementIDTrackerSpecDoc>(opt.trackerModelName, IDSchema, opt.trackerCollection);
      // test if the counter document already exists
      const counter = await model
        .findOne({
          modelName,
          field: opt.field,
        })
        .lean()
        .exec();

      if (!counter) {
        await model.create({
          modelName,
          field: opt.field,
          count: opt.startAt - opt.incrementBy,
        });
      }
    }

    if (!this.isNew) {
      logger.info("Document is not new, not incrementing");

      return;
    }

    if (typeof this[AutoIncrementIDSkipSymbol] === "boolean" && AutoIncrementIDSkipSymbol) {
      logger.info("Symbol \"AutoIncrementIDSkipSymbol\" is set to \"true\", skipping");

      return;
    }

    const leandoc: { count: number } = (await model
      .findOneAndUpdate(
        {
          field: opt.field,
          modelName,
        },
        {
          $inc: { count: opt.incrementBy },
        },
        {
          new: true,
          fields: { count: 1, _id: 0 },
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )
      .lean()
      .exec()) as any; // it seems like "FindAndModifyWriteOpResultObject" does not have a "count" property

    if (isNullOrUndefined(leandoc)) {
      throw new Error(`"findOneAndUpdate" incrementing count failed for "${modelName}" on field "${opt.field}"`);
    }

    logger.info("Setting \"%s\" to \"%d\"", opt.field, leandoc.count);

    const productCode = (this.product?.productCode ?? 0).toString();
    const productCodeChecksum = crc8(productCode).toString(16).padStart(2, '0');
    this[opt.field] = `${leandoc.count}${productCodeChecksum}`;
  });
}
