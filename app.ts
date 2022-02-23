import express from "express";
import cors from "cors";
import { apiRouter } from "./routers/api.routers";
const app = express();

app.use(express.json());

app.use(cors());

app.use("/api", apiRouter);

app.all("*", (req, res) => {
  return res.status(404).send({ message: "Endpoint does not exist" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  // console.log(err);

  res.status(500).send({ message: "Something went wrong" });
});

export { app };
