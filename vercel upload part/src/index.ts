import express from "express" ;
import cors from "cors" ;
import simpleGit from "simple-git" ;
import {generate} from "./utils" ;
import path from "path" ;
import { getAllFiles } from "./file";
import {uploadFile} from "./aws" ;
import {createClient} from "redis" ;
// uploadFile("dist/output/yr8yt/package.json","/Users/kyama/vercel project/dist/output/yr8yt/package.json")

const app = express() ;
app.use(cors()) ;
app.use(express.json()) ;
const publisher = createClient();
publisher.connect();
const subscriber = createClient();
subscriber.connect();

// console.log("Service started send a repoUrl\n");

app.post("/deploy",async(req,res)=>{
    const repoUrl = req.body.repoUrl ;  //the repo url from github the user enters in the form
    const id = generate() ;
    await simpleGit().clone(repoUrl,path.join(__dirname,`output/${id}`)); 

    const files = getAllFiles(path.join(__dirname,`output/${id}`)) ;
    console.log(files); 

    files.forEach(async file=>{
        await uploadFile(file.slice(__dirname.length+1).replace(/\\/g, '/'),file) ;
        console.log(file.slice(__dirname.length+1).replace(/\\/g, '/'));
    })


    publisher.lPush("build-queue",id) ;
    publisher.hSet("status",id,"uploaded");

    // console.log("Turn on deploy part\n")
    // const value =  await publisher.hGet("status",id);
    
    res.json({
        id:id
    })
})

app.get("/status",async(req,res)=>{
    const id = req.query.id ;
    const response = await subscriber.hGet("status",id as string);
    res.json({
        status:response
    })
})

app.listen(3000) ;