import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
import env from "dotenv";
import 'express-async-errors';
import notFound from "./middleware/NotFound.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import { router as routerProduct } from "./routes/productRoutes.js";
import { router as routerMedia } from "./routes/mediaRoutes.js";
import { connectDB } from "./db/connect.js";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import morgan from "morgan";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";
import cors from "cors";

env.config();
const app = express();
const PORT = process.env.PORT || 3000;

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(morgan("tiny"));
app.use(
  express.static(path.resolve(path.dirname(__dirname), "./frontend/dist"))
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/api/v1/products", routerProduct);
app.use("/api/v1/media", routerMedia);

app.use(notFound);
app.use(errorHandlerMiddleware);

async function startApp() {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, function () {
      console.log(`Server was started on ${PORT} Port`);
    });
  } catch (error) {
    console.log(error);
  }
}

startApp();
