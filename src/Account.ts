import knex from "./Database"

export default class Account {
    static All: Account[] = [];

    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    static loadAll() {
        return new Promise(function (resolve, reject) {
            knex.select().table('accounts')
                .then(function(collection) {
                    // Load and parse results
                    resolve();
                })
                .catch(function() {
                    reject('Database error');
                })
        })
    }
}