import "reflect-metadata";
import express from "express";
import cors from "cors";
import config from "config";
import productRoutes from "./routes/index";
import { AppDataSource } from "./data-source";

const port: number = config.get("port") || 8080;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/products", productRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}!`);
    });
  })
  .catch((error) => console.log(error));
