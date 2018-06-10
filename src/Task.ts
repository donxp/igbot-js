import {TaskType} from "./TaskType"
import {TaskStatus} from "./TaskStatus";
import {Promise} from "bluebird";
import {machineId} from "node-machine-id";

export default class Task {
    id: number;
    target: string;
    type: TaskType;
    amount: number;
    status: TaskStatus;
    assignedTo: string;

    constructor(id: number, target: string, amount: number, type: TaskType, status: TaskStatus) {
        this.id = id;
        this.target = target;
        this.type = type;
        this.amount = amount;
        this.status = status;
    }

    static getAssignedPendingTasks() {
        return new Promise(function(resolve, reject) {
            Promise.resolve(machineId()).then(function(hwid) {

            })
        });
    }
}