import express from "express";
import "./config/index";
import CONFIG from "./config/index";
import cors from "cors";
import routes from "./routes";
import errorHandler from "@middleware/error-handler";
const app = express();

const main = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use("/api/v1", routes());
  app.use(errorHandler);
  app.listen(CONFIG.SERVER_PORT, () => {
    console.log(`Listen to port: ${CONFIG.SERVER_PORT}`);
  });
};

main();
