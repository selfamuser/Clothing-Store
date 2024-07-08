import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import dbConnect from "./config/dbConnect.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import authRouter from "./routers/authRoute.js";
import blogRoute from "./routers/blogRoute.js";
import productRoute from "./routers/productRoute.js";

const app = express();

dotenv.config();

//connecting database configured in config;
dbConnect();

app.use(morgan("dev"));
//using body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

const PORT = process.env.PORT || 4040;

app.use(cors());

//routes
app.use("/api/user", authRouter);
app.use("/api/product", productRoute);
app.use("/api/blog", blogRoute);

//middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
