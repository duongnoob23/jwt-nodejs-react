import express from "express";
import initWebRoutes from "./routes/web";
import configViewEngine from "./configs/viewEngine";
require("dotenv").config();
import bodyParser from "body-parser";
import connection from "./configs/connectDB";
import cors from "cors";
import initApiRoutes from "./routes/api";
import configCors from "./configs/cors";
const app = express();
// config view engine
configViewEngine(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection
connection();

configCors(app);
// app.use(cors());
//init web routes
initApiRoutes(app);
initWebRoutes(app);

const PORT = process.env.PORT || 8080;

//config cors

app.listen(PORT, () => {
  console.log("JWT Backend is running on the port = " + PORT);
});
// lll
