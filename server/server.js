import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

connectDB();

app.use("/", (req, res) => {
  res.send("server is running!");
});

app.listen(PORT, (err) => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
