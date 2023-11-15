import express, { Express } from "express";
import * as AWS from "aws-sdk";
import cors from "cors";
import "dotenv/config"

//routers
import { uploadRouter } from "./routers/upload";
import { downloadRouter } from "./routers/download";

//AWS
AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
});

const app: Express = express();
const PORT = 8080;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/download", downloadRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));