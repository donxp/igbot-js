import LuminatiApi from "./LuminatiApi";

export default class Proxy {
    port: number;
    ip: string;

    constructor(port: number, ip: string='127.0.0.1') {
        this.port = port;
        this.ip = ip;
    }

    refreshIp() {
        return new Promise((resolve, reject) => {
            LuminatiApi.refreshSessions(this.port)
                .then(resolve)
                .catch(reject);
        })
    }

    delete() {
        return new Promise((resolve, reject) => {
            LuminatiApi.deleteProxy(this.port)
                .then(resolve)
                .catch(reject);
        });
    }
}