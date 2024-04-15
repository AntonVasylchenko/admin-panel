import { Media } from "../models/Media.js";
import fs from "fs";
import cloudinary from "cloudinary";

export async function allMedia(req, res) {
  try {
    const media = await Media.find({});
    if (!media) {
      throw new Error("Media not found");
    }
    res.status(200).json({ media });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
}
export async function createMedia(req, res) {
  try {
    if (!req.files) {
      throw new Error("Please provide media");
    }
    const media = req.files.media;
    if (!media.mimetype.startsWith("image")) {
      throw new Error("Please upload image or video");
    }
    const result = await cloudinary.v2.uploader.upload(
      req.files.media.tempFilePath,
      {
        use_filename: true,
        folder: "file",
      }
    );
    fs.unlinkSync(req.files.media.tempFilePath);

    await Media.create({ path: result.secure_url });

    return res.status(201).json({
      image: { src: result.secure_url },
    });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
}
export async function deleteMedia(req, res) {
  try {
    res.send("Remove media");
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
}
