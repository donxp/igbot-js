import * as config from "config";
import * as request from "request-promise-native";

export default class LuminatiApi {
    static getLuminatiUri() {
        return 'http://' + config.get('luminati_host') + ':' + config.get('luminati_port') + '/';
    }

    static refreshSessions(port: number) {
        const options = {
            uri: this.getLuminatiUri() + 'api/refresh_sessions/' + port,
            method: 'POST',
            resolveWithFullResponse: true,
            simple: false
        };

        return new Promise(function(resolve, reject) {
            request(options)
                .then(function(response) {
                    if(response.statusCode === 204) {
                        resolve();
                    } else {
                        reject('Unexpected status code. Proxy most likely doesn\'t exist.');
                    }
                })
                .catch(function(error) {
                    reject('Unable to execute request.')
                });
        });
    }

    static deleteProxy(port) {
        const options = {
            uri: this.getLuminatiUri() + 'api/proxies/' + port,
            method: 'DELETE',
            resolveWithFullResponse: true,
            simple: false
        };

        return new Promise(function(resolve, reject) {
            request(options)
                .then(function(response) {
                    if(response.statusCode === 204) {
                        resolve();
                    } else {
                        reject('Unexpected status code.');
                    }
                })
                .catch(function(error) {
                    reject('Unable to execute request.')
                });
        })
    }
}