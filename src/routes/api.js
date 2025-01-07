// import { homeController } from "../controller/homeController";
import express from "express";
// const homeController = require("../controller/homeController");
import * as apiController from "../controller/apiController";
const router = express.Router();

const initApiRoutes = (app) => {
  router.get("/test-api", apiController.testApi);
  router.post("/register", apiController.handleRegister);
  router.post("/hello", apiController.hello);

  return app.use("/api/v1", router); //web của mình sử dụng link bắt đầu với /
};

export default initApiRoutes;
// các api này sử dụng cho SSR trước khi học với CSR (react+ node.js)
