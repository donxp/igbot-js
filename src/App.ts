import Proxy from "./Proxy"
import knex from "./Database"
import Account from "./Account"
import * as MailListener from "mail-listener4"
import MailRu from "./MailRu"
import {machineId} from "node-machine-id"
import ClusterManager from "./ClusterManager";

Account.loadAll().then(() => {
    console.log('Number of accs:', Account.All.length);

    ClusterManager.UpdateHeartbeat();
   /* MailRu.getActToken('kabanovvyacheslavcyr404@list.ru')
        .then(function(token: string) {
            console.log('Got token', token);
            MailRu.login('kabanovvyacheslavcyr404@list.ru', 'x0xN25pZL', token)
                .then(function(response) {
                    console.log('Got response');
                    console.log(response);
                })
                .catch(function(error) {
                    console.log('Got error', error);
                })
        })*/
    /*let proxy = new Proxy(24000);

    let account = Account.All[6];

    let mailListener = new MailListener({
        username: account.email,
        password: account.emailPassword,
        host: "imap.mail.ru",
        port: 993,
        tls: true,
        mailbox: "INBOX",
        searchFilter: ["ALL"],
        markSeen: true,
        fetchUnreadOnStart: true
    });

    mailListener.start();

    mailListener.on("server:connected", () => console.log("Connected to server"));*/
});