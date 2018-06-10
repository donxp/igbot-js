import knex from "./Database";
import {machineId} from "node-machine-id"
import {Promise} from "bluebird"


export default class ClusterManager {
    static UpdateHeartbeat() {
        Promise.resolve(machineId())
            .then((hwid) => {
                return [hwid, knex('bots').where('hwid', hwid)];
            })
            .spread((hwid, result: object[]) => {
                let lastOnlineAt = Date.now() / 1000 | 0;
                if(result.length == 0) {
                    return knex('bots').insert({hwid, lastOnlineAt});
                } else {
                    return knex('bots').where({hwid}).update({lastOnlineAt});
                }
            });
    }
}