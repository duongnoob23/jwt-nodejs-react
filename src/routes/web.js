// import { homeController } from "../controller/homeController";
import express from "express";
import * as homeController from '../controller/homeController';
// const homeController = require("../controller/homeController");
const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homeController.handleHiWord);
    router.get("/user", homeController.handleUserPage);
    router.post("/users/create-user",homeController.handleCreateNewUser);
    router.post("/abc", homeController.handleAbc);

    return app.use("/", router); //web của mình sử dụng link bắt đầu với /
}

export default initWebRoutes;
// các api này sử dụng cho SSR trước khi học với CSR (react+ node.js) 