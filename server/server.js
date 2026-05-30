import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

connectDB();

app.use("/", (req, res) => {
  res.send("server is running!");
});
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
