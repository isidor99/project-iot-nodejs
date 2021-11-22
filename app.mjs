import express from "express";
import morgan from "morgan";

import deviceRouter from "./api/device.mjs";
import measurementInfoRouter from "./api/measurement_info.mjs";
import measurementRouter from "./api/measurement.mjs";
import userRouter from "./api/user.mjs";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/device", deviceRouter);
app.use("/measurement-info", measurementInfoRouter);
app.use("/measurement", measurementRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;

  next(err);
});

export default app;
