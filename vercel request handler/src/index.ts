import express from "express";
import { S3 } from "aws-sdk";


const s3 = new S3({
    accessKeyId: "622a5fbfbe5d730747281397f34f18cb",
    secretAccessKey: "d8d81f614818c7a30171e948bedd0eaded9824e1a4a02b6ca866f7743a93dcf5",
    endpoint: "https://4eee122ac06fb45468c591537ee3dc7f.r2.cloudflarestorage.com"
})

const app = express();

app.get("/*",)

app.get("/*", async (req, res) => {

    // const host = req.hostname;
    // console.log(host);
    // const id = host.split(".")[0];
    // console.log(id);
    // const id = "e22xq"
    const fp = req.path
    const id = fp.split(",")[1] as string;
    const filePath = fp.split(",")[0]  as string;
    console.log(id)
    console.log(filePath)
    console.log(`dist/${id}${filePath}`)
    // console.log(`dist${filePath}`)

    const contents = await s3.getObject({
        Bucket:"vercel",
        Key: `dist/${id}${filePath}`
    }).promise();

    // const filePath = req.path;
    // const pathParts = filePath.split("/");

    // if (pathParts.length < 3) {
    // // Handle error: malformed path
    // throw new Error("Malformed path");
    // }

    // const id = pathParts[1] as string;
    // const fp = pathParts.slice(2).join("/") as string; // Join remaining parts to handle deeper paths if any
    // console.log(id);
    // console.log(filePath);
    // console.log(`dist/${id}/${fp}`); // Ensure proper format with slashes

    // const contents = await s3.getObject({
    //     Bucket: "vercel",
    //     Key: `dist/${id}/${fp}` // Ensure key is correct
    // }).promise();


    const type = filePath.endsWith("html")? "text/html":filePath.endsWith("css")?"text/css":"application/javascript"
    res.set("Content-Type",type);
    res.send(contents.Body);
   
})

app.listen(3001)