import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import genAIRoutes from "./routes/genAIRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "*",
    methods: ["GET"],
  })
);
app.use(express.json());

app.use("/v1", genAIRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
