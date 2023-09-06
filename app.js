import express from "express";
import userRoute from "./routes/userRoute.js";
import AppError from "./utils/AppError.js";
import morgan from "morgan";
import serverless from "serverless-http";

const app = express();

const router = express.Router();
//Develpment Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 1 - MIDDLEWARE
app.use(morgan("dev"));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

app.use("/user", userRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

app.use("/.netlify/functions/api", router);

export const handle = serverless(app);
export default app;
