import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import taskRouter from "./routers/taskRoute.js";
import userRoutes from "./routers/userRoutes.js";
import projectRoutes from "./routers/projectRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

app.use("/api/Users", userRoutes);

app.use("/api/Tasks", taskRouter);

app.use("/api/Projects", projectRoutes);

app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log("Server is running on port 5000");
});
