// dokagorikodoi:bwq0klnj
const config = require('config');
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: config.get('mysql.host'),
        user: config.get('mysql.username'),
        password: config.get('mysql.password'),
        database: config.get('mysql.database'),
    }
});
var Client = require('instagram-private-api').V1;
var device = new Client.Device('dokagorikodoi');
var storage = new Client.CookieFileStorage(__dirname + '/cookies/dokagorikodoi.json');

const Proxy = require('./Proxy');
// LOOk
// =>>>>> https://github.com/Kannaj/node-knex-sample
knex.select().table('accounts')
    .then(console.log);
/*var proxy = new Proxy(24000);

proxy.refreshIp()
    .then(function() {
        console.log('Ip refreshed');
    })
    .catch(function(error) {
        console.log('Got error refreshing:', error);
    });*/

/*
Client.Session.create(device, storage, 'dokagorikodoi', 'bwq0klnj', 'http://127.0.0.1:24000/')
    .then(function(session) {
        return [session, Client.Account.searchForUser(session, 'drake')]
    })
    .spread(function(session, account) {
        return Client.Relationship.create(session, account.id);
    })
    .then(function(rel) {
        console.log(rel.params);
    });*/
