// Server
import express from "express";
import "dotenv/config";
import "express-async-errors";

// DV
import { connectDB } from "./db/connect.js";

// File
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";

// Dev Library
import morgan from "morgan";

// CORS
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";
import cors from "cors";

// Controls
import { logRoutes, mediaRoutes, productRoutes } from "./routes/index.js";

// Middleware
import {
  notFoundMiddleware,
  errorHandlerMiddleware,
  createLog
} from "./middleware/index.js";

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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/api/v1/products",productRoutes);
app.use("/api/v1/media", mediaRoutes);
app.use("/api/v1/log", logRoutes);

app.use(notFoundMiddleware);
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
