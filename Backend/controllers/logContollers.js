import { Log } from "../models/Log.js";
import customError from "../errors/index.js";
import StatusCodes from "http-status-codes";

export async function getAllLog(req, res) {
  const logs = await Log.find({});
  if (!logs) {
    throw new customError.BadRequestError("Logs not found");
  }
  res.status(StatusCodes.OK).json({ logs });
}
export async function getSingleLog(req, res) {
  const { id: logId } = req.params;
  const log = await Log.findOne({ _id: logId });
  if (!log) {
    throw new customError.BadRequestError(`Log not found with ${logId}`);
  }
  res.status(StatusCodes.OK).json({ log });
}
export async function createLog(req, res) {
  const { product, media } = req.body;
  if (!product || !media) {
    throw new customError.BadRequestError(
      "Please provide product id or media id for log"
    );
  }
  const log = await Log.create({
    action: "Created",
    name: "Product",
    product: "663badba0b018cfe4b09a03f",
  });
  if (!log) {
    throw new customError.BadRequestError("Log was not created");
  }
  res.status(StatusCodes.CREATED).json({ log });
}
export async function changeLog(req, res) {
  const { id: logId } = req.params;
  const log = await Log.findOneAndUpdate({ _id: logId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!log) {
    throw new customError.BadRequestError(`Log not found with ${productId}`);
  }

  res.status(StatusCodes.OK).json({ log });
}
export async function removeAllLog(req, res) {
  const logs = await Log.deleteMany({});
  if (!logs) {
    throw new customError.BadRequestError("Logs not found");
  }
  res.status(StatusCodes.OK).json({ msg: "All logs was deleted" });

}
export async function removeSingleLog(req, res) {
  const { id: logId } = req.params;
  const log = await Log.findOne({ _id: logId });
  if (!log) {
    throw new customError.BadRequestError(`Log not found with ${logId}`);
  }
  await log.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Log deleted" });
}
