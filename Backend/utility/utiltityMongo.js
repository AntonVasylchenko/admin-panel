export async function createArrayDb(bodyParams, model, type, value) {
  const arrayIds = bodyParams?.split(",") || [];
  return await Promise.all(
    [...arrayIds].map(async (elementId) => {
      const elementModel = await model.findOne({ _id: elementId });
      if (!elementModel) {
        throw new BadRequestError(`No ${type} with  id: ${elementId}`);
      }
      return elementModel[value];
    })
  );
}
