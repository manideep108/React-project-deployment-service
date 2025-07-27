import { createClient, commandOptions } from "redis";
import { downloadS3Folder } from "./aws";
import { copyFinalDist } from "./aws";
import { buildProject } from "./utils";

const subscriber = createClient();
subscriber.connect() ; //connects automatically to local redis server.

const publisher = createClient();
publisher.connect() ; //connects automatically to local redis server.

async function main() {
    while(1) {
        const res = await subscriber.brPop(
            commandOptions({ isolated: true }),
            'build-queue',
            0
          );
		console.log(res);
        //@ts-ignore;
        const id = res.element
        await downloadS3Folder(`output/${id}`)
        console.log("downloaded!");

        await buildProject(id);
        console.log("built react into html css js!");

        copyFinalDist(id);

        publisher.hSet("status",id,"deployed");
    }
}
main();