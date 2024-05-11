import customError from "../errors/index.js";

export async function createLogDb(formData, type, objectId, model) {
  const log = await model.create({ ...formData,[type]:objectId });
  if (!log) {
    throw new customError.BadRequestError("Log was not created");
  }
}
export async function updateLogDb(formData, objectId, model) {
  const log = await model.findOneAndUpdate(objectId, formData, {
    new: true,
    runValidators: true,
  });
  if (!log) {
    throw new customError.BadRequestError("Log was not changed");
  }
}
