// dokagorikodoi:bwq0klnj
var Client = require('instagram-private-api').V1;
var device = new Client.Device('dokagorikodoi');
var storage = new Client.CookieFileStorage(__dirname + '/cookies/dokagorikodoi.json');

Client.Session.create(device, storage, 'dokagorikodoi', 'bwq0klnj', 'http://127.0.0.1:24000/')
    .then(function(session) {
        return [session, Client.Account.searchForUser(session, 'drake')]
    })
    .spread(function(session, account) {
        return Client.Relationship.create(session, account.id);
    })
    .then(function(rel) {
        console.log(rel.params);
    });