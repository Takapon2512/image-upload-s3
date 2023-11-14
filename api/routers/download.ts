import { Router } from "express";
import multer from "multer";
import * as AWS from "aws-sdk";

export const downloadRouter = Router();

const s3 = new AWS.S3();
const bucketName = process.env.AWS_BUCKET_NAME;
const folderName = "images/";

downloadRouter.get("/list-images", async (req, res) => {
    try {
        const params = {
            Bucket: bucketName || "",
            Prefix: folderName
        };

        const data = await s3.listObjectsV2(params).promise();

        const images = data.Contents?.map((obj) => {
            return {
                key: obj.Key,
                url: `${process.env.S3_URL}/${obj.Key}`,
                lastModified: obj.LastModified,
                size: obj.Size
            };
        });

        res.status(200).json({ images });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "画像一覧の取得に失敗しました" });
    };
});
