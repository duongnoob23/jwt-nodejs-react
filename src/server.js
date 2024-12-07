import express from "express";
import initWebRoutes from "./routes/web";
import configViewEngine from "./configs/viewEngine";
require("dotenv").config();
import bodyParser from "body-parser";
import connection from "./configs/connectDB";
const app = express();
// config view engine
configViewEngine(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection
connection();

//init web routes
initWebRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("JWT Backend is running on the port = " + PORT);
})
// 