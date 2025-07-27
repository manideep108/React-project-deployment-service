import { S3 } from "aws-sdk";
import fs from "fs";

// replace with your own credentials
const s3 = new S3({
    accessKeyId: "622a5fbfbe5d730747281397f34f18cb",
    secretAccessKey: "d8d81f614818c7a30171e948bedd0eaded9824e1a4a02b6ca866f7743a93dcf5",
    endpoint: "https://4eee122ac06fb45468c591537ee3dc7f.r2.cloudflarestorage.com"
})

// fileName => output/12312/src/App.jsx
// filePath => /Users/kyama/vercel project/dist/output/12312/src/App.jsx
export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: fileName,
    }).promise();
    console.log(response);
}