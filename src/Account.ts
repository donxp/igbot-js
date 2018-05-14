import knex from "./Database";
import {V1 as Client} from "instagram-private-api";
import Proxy from "./Proxy";

export default class Account {
    static All: Account[] = [];

    username: string;
    password: string;
    email: string;
    emailPassword: string;
    proxy: Proxy;
    cookieMemoryStorage: Client.CookieMemoryStorage;

    constructor(username: string, password: string, email: string, emailPassword: string) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.emailPassword = emailPassword;

        this.cookieMemoryStorage = null;
    }

    public attachProxy(proxy: Proxy) {
        this.proxy = proxy;
    }

    /**
     * Get relationship between current account and target account.
     *
     * @param {string} user
     * @return {Promise}
     */
    public getRelationship(user: string) {
        return new Promise((resolve, reject) => {
            this.createUserSession()
                .then(function(session) {
                    return [session, Client.Account.searchForUser(session, user)];
                })
                .spread(function(session, account) {
                    return Client.Relationship.create(session, account.id);
                })
                .then(resolve)
                .catch(reject);
        })
    }

    /**
     * Create a proxied user session.
     *
     * @return {any}
     */
    private createUserSession() {
        return Client.Session.create(this.createDevice(), this.cookieMemoryStorage, this.username, this.password, `http://${this.proxy.ip}:${this.proxy.port}/`)
    }

    /**
     * Create an emulated device based on username as the seed.
     *
     * @return {Client.Device}
     */
    private createDevice() {
        return new Client.Device(this.username);
    }

    /**
     * Create a memory-based cookie storage.
     */
    public createCookieStorage() {
        this.cookieMemoryStorage = new Client.CookieMemoryStorage();
    }

    /**
     * Desotry the memory-based cookie storage.
     */
    public destroyCookieStorage() {
        if(this.cookieMemoryStorage != null) this.cookieMemoryStorage.destroy();
    }

    /**
     * Load all accounts from the database.
     *
     * @return {Promise<any>}
     */
    static loadAll() {
        return new Promise(function (resolve, reject) {
            knex.select().table('accounts')
                .then(function(collection) {
                    collection.forEach(function(account) {
                        Account.All.push(new Account(account.username, account.password, account.email, account.email_password));
                    });
                    resolve();
                })
                .catch(function() {
                    reject('Database error');
                })
        })
    }
}