import * as cluster from "cluster"

export default class Worker {
    static All: Worker[] = [];

    private worker: cluster.Worker;
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

    public hasStarted() : boolean {
        return this.started;
    }
}