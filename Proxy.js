const rp = require('request-promise-native');
const config = require('config');
const LuminatiApi = require('./LuminatiApi');

class Proxy {
    constructor(port, ip = '127.0.0.1') {
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

module.exports = Proxy;