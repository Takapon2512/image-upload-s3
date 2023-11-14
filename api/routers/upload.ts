import { Router } from "express";
import multer from "multer";
import * as AWS from "aws-sdk";

export const uploadRouter = Router();

//S3のインスタンス作成
const s3 = new AWS.S3();
const bucketName = process.env.AWS_BUCKET_NAME;

//Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

uploadRouter.post("/upload", upload.single('image'), async (req, res) => {
    const data: Express.Multer.File | undefined = req.file;
    
    try {
        if (data) {
            const params = {
                Bucket: bucketName || "",
                Key: `images/${Date.now()}_${data.originalname}`,
                Body: data.buffer,
                ContentType: data.mimetype,
            };

            await s3.upload(params).promise();

            return res.status(200).json({ message: "アップロード完了！" });
        } else {
            return res.status(500).json({ message: "アップロードに失敗しました。" });
        };
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "アップロードできません。" });
    };
});