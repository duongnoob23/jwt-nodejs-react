// import { homeController } from "../controller/homeController";
import express from "express";
// const homeController = require("../controller/homeController");
import * as apiController from "../controller/apiController";
import * as userController from "../controller/userController";
import * as groupController from "../controller/groupController";
import { checkUserPermission, JWTCheck } from "../middleware/JWTACtion";
const router = express.Router();

const initApiRoutes = (app) => {
  router.all("*", JWTCheck, checkUserPermission);

  router.get("/test-api", apiController.testApi);

  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  // 4 api mới Controller mới
  // path, handler
  // rest api
  // GET - R , POST - C , PUT - U , DELETE - D
  router.get("/user/read", userController.readFunc);
  router.post("/user/create", userController.createFunc);
  router.put("/user/update", userController.updateFunc);
  router.delete("/user/delete/:id", userController.deleteFunc);
  //Group
  router.get("/group/read", groupController.readFunc);
  return app.use("/api/v1", router); //web của mình sử dụng link bắt đầu với /
};

export default initApiRoutes;
// các api này sử dụng cho SSR trước khi học với CSR (react+ node.js)
