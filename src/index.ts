import express from "express";
import cors from "cors";
import routes from "./4. routes";
import errorHandler from "./_lib/middleware/error-handler";
import CONFIG from "./_lib/config";

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
