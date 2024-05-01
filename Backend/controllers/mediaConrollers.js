import { Media } from "../models/Media.js";
import fs from "fs";
import cloudinary from "cloudinary";

export async function allMedia(req, res) {
  const media = await Media.find({});
  if (!media) {
    throw new Error("Media not found");
  }
  res.status(200).json({ media });
}
export async function createMedia(req, res) {
  if (!req.files) {
    throw new Error("Please provide media");
  }
  const media = req.files.media || req.files.file;
  if (!media.mimetype.startsWith("image")  ) {
    throw new Error("Please upload image or video");
  }
  const result = await cloudinary.v2.uploader.upload(
    media.tempFilePath,
    {
      use_filename: true,
      folder: "file",
    }
  );
  fs.unlinkSync(media.tempFilePath);

  await Media.create({ path: result.secure_url });

  return res.status(201).json({
    image: { src: result.secure_url },
  });
}
export async function deleteMedia(req, res) {
  res.send("Remove media");
}
