import Proxy from "./Proxy"
import knex from "./Database"
import Account from "./Account"
import * as MailListener from "mail-listener4"
import MailRu from "./MailRu"
import {machineId} from "node-machine-id"
import ClusterManager from "./ClusterManager"
import Worker from "./Worker"
import * as cluster from "cluster"
import * as waitUntil from "async-wait-until"

const workerCount : number = 2;

if(cluster.isMaster) {
    console.log(`Master worker (${process.pid}) started.`);

    for(let i = 0; i < workerCount; i++) {
        new Worker(cluster.fork(), cluster.workers);
    }

    console.log('All workers have been spawned. Waiting until start.');

    waitUntil(() => {
        const startedWorkers = Worker.All.filter(worker => worker.hasStarted());
        return workerCount == startedWorkers.length;
    }, 5000, 100).then(function() {
        console.log('All workers have started.');
    }).catch(function(err) {
        console.log('Timed out waitUntil:', err);
    });

    /* wait until all workers started */

    /*for(let i = 0; i < ClusterManager.Workers.length; i++) {
        cluster.workers[ClusterManager.Workers[i].id].on('message', function(ev) {
            if(ev.msg == 'started') {
                console.log(`Worker (${ClusterManager.Workers[i].process.pid}) confirmed to have started.`);
            }
        })
    }*/

    Account.loadAll().then(() => {
        console.log('Number of accs:', Account.All.length);
    });
} else {
    console.log(`Worker (${process.pid}) started.`);
    process.send({ msg: 'started' })
}

