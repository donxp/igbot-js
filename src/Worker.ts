import * as cluster from "cluster"

export class Worker {
    static All: Worker[] = [];

    public worker: cluster.Worker;
    private started: boolean;

    constructor(worker: cluster.Worker, workers) {
        this.worker = worker;
        this.started = false;

        workers[worker.id].on('message', (event) => {
            if(event.msg == 'started') {
                console.log(`Worker (${this.worker.process.pid}) reported to have started.`);
                this.started = true;
            }
        });

        Worker.All.push(this);
    }

    public getPid() {
        return process.pid;
    }

    public hasStarted() : boolean {
        return this.started;
    }

    public static sendStartedStatus() {
        process.send({
            event: 'started',
            pid: process.pid
        });
    }
}

export const Work = function() {
    console.log('Do work');
};