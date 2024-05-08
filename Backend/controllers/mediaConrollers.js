import { Media } from "../models/Media.js";
import fs from "fs";
import cloudinary from "cloudinary";
import customError from "../errors/index.js";
import StatusCodes from "http-status-codes";



export async function allMedia(req, res) {
  const media = await Media.find({});
  if (!media) {
    throw new customError.BadRequestError("Media not found");
  }
  res.status(StatusCodes.OK).json({ media });
}
export async function createMedia(req, res) {
  if (!req.files) {
    throw new customError.BadRequestError("Please provide media");
  }
  const media = req.files.media || req.files.file;
  if (!media.name) {
    throw new customError.BadRequestError("Please provide media name");
  }
  const isMediaExist = await Media.findOne({name:media.name});

  if (isMediaExist) {
    throw new customError.BadRequestError("This media have already added");
  }

  if (!media.mimetype.startsWith("image")  ) {
    throw new customError.BadRequestError("Please upload image or video");
  }

  const maxSize = 1024 * 1024;

  if (media.size > maxSize) {
    throw new customError.BadRequestError("Please upload smaller than 1MB");
  }

  const result = await cloudinary.v2.uploader.upload(
    media.tempFilePath,
    {
      use_filename: true,
      folder: "file",
    }
  );
  fs.unlinkSync(media.tempFilePath);

  await Media.create({ path: result.secure_url, name:media.name, public_id:result.public_id });

  return res.status(StatusCodes.CREATED).json({
    image: { path: result.secure_url, name:media.name, public_id:result.public_id },
  });
}
export async function deleteMedia(req, res) {
  const {id: mediaId} = req.params;
  const media = await Media.findOne({_id: mediaId});
  if (!media) {
    throw new customError.BadRequestError(`Media not found with ${mediaId}`);
  }

  await media.findDeleteMedia()
  await media.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Media deleted" });

}
