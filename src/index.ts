import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import todoRoutes from "./routes/todo.routes";

mongoose.connect(process.env.MONGODB_CONNECTION_URI as string).then(() => {
  console.log("Connected to Database successfully")
});

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/todos", todoRoutes);

app.get("/", async (req: Request, res: Response) => {
  console.log(req.body);
  res.json({
    message: "Hello World",
  });
});

app.get("/health", async (req: Request, res: Response) => {
  res.send({
    message: "Server Health is OK!",
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
