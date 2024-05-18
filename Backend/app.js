// Server
import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import "dotenv/config";
import "express-async-errors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename,__dirname);




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

// Cookie
import cookieParser from 'cookie-parser';

// Controls
import * as indexJs from "./routes/index.js";

// Middleware

import * as indexMiddlewareJs from "./middleware/index.js";

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


app.use(express.static(path.resolve(__dirname, './client/dist')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_KEY));



app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/api/v1/products", indexJs.productRoutes);
app.use("/api/v1/media", indexJs.mediaRoutes);
app.use("/api/v1/log", indexJs.logRoutes);
app.use("/api/v1/collection", indexJs.collectionRoutes);
app.use("/api/v1/customer", indexJs.customerRoutes);
app.use("/api/v1/auth", indexJs.authRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

app.use(indexMiddlewareJs.errorHandlerMiddleware);

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
