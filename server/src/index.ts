import "reflect-metadata";
import express, {
  Request,
  ErrorRequestHandler,
  NextFunction,
  Response,
} from "express";
import cors from "cors";
import config from "config";
import productRoutes from "./routes/index";
import { AppDataSource } from "./data-source";
import router from "./routes/index";
import bodyParser from "body-parser";
import { CustomError, CustomReq } from "./types";

const port: number = config.get("port") || 8080;

const app = express();

app.use(express.json());
// app.use(bodyParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend domain
  methods: "GET,POST,PATCH,DELETE", // Allowed methods
  allowedHeaders: "Content-Type, Authorization", // Allowed headers
};

app.use(cors(corsOptions));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// app.use((error: CustomError, req: CustomReq, res: Response) => {
//   const status = error.status || 500;
//   const message = error.message || "Something went wrong.";
//   res.status(status).json({ message: message });
// });

app.use("/", router);

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}!`);
    });
  })
  .catch((error) => console.log(error));
