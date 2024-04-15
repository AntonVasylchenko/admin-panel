import express from "express";
import env from "dotenv";
import notFound from "./middleware/NotFound.js";
import { router as routerProduct } from "./routes/productRoutes.js";
import { router as routerMedia } from "./routes/mediaRoutes.js";
import { connectDB } from "./db/connect.js";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
env.config();
const app = express();
const PORT = process.env.PORT || 5000;


cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/", function (req, res) {
  res.send("Hello world");
});
app.use("/api/v1/products", routerProduct);
app.use("/api/v1/media", routerMedia);
app.use(notFound);

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
