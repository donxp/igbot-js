import * as waitUntil from "async-wait-until";
import * as cluster from "cluster";
import {Worker} from "./Worker";
import Account from "./Account";

export default function() {
    let workerCount = 1; // TODO: Load from config
    console.log(`Master worker (${process.pid}) started.`);

    for(let i = 0; i < workerCount; i++) {
        let worker = cluster.fork();

        worker.on('message', (ext) => {
            console.log('Got message from worker', ext)
        })
    }

    console.log('Started all workers');

}