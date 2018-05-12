const knex = require('./Database');

class Account {
    static All = [];

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static loadAll() {
        let account = new Account();

        knex.select().table('accounts');
    }
}

module.exports = Account;