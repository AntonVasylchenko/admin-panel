import express from "express";
import env from "dotenv";
import notFound from "./middleware/NotFound.js";
import { router } from "./routes/productRoutes.js";
env.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", function (req, res) {
    res.send("Hello world");
});
app.use("/api/v1/products",router)
app.use(notFound);

async function startApp() {
  try {
    app.listen(PORT, function () {
      console.log(`Server was started on ${PORT} Port`);
    });
  } catch (error) {
    console.log(error);
  }
}

startApp();
