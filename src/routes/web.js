import express from "express";
import homeController from "../controller/homeController";
const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homeController.handleHiWord);
    router.get("/user", homeController.handleUserPage);

    return app.use("/", router); //web của mình sử dụng link bắt đầu với /
}

export default initWebRoutes;