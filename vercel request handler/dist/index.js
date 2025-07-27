"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aws_sdk_1 = require("aws-sdk");
const s3 = new aws_sdk_1.S3({
    accessKeyId: "622a5fbfbe5d730747281397f34f18cb",
    secretAccessKey: "d8d81f614818c7a30171e948bedd0eaded9824e1a4a02b6ca866f7743a93dcf5",
    endpoint: "https://4eee122ac06fb45468c591537ee3dc7f.r2.cloudflarestorage.com"
});
const app = (0, express_1.default)();
app.get("/*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const host = req.hostname;
    // console.log(host);
    // const id = host.split(".")[0];
    // console.log(id);
    // const id = "e22xq"
    const fp = req.path;
    const id = fp.split(",")[1];
    const filePath = fp.split(",")[0];
    console.log(id);
    console.log(filePath);
    console.log(`dist/${id}${filePath}`);
    // console.log(`dist${filePath}`)
    const contents = yield s3.getObject({
        Bucket: "vercel",
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
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript";
    res.set("Content-Type", type);
    res.send(contents.Body);
}));
app.listen(3001);
