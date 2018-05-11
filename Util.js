const knex = require('knex');
const config = require('config');

class Util {
    static databaseInstance = null;

    static getDatabase() {
        if(this.databaseInstance == null) {
            this.databaseInstance = knex({
                client: 'mysql2',
                connection: {
                    host: config.get('mysql.host'),
                    user: config.get('mysql.username'),
                    password: config.get('mysql.password'),
                    database: config.get('mysql.database'),
                }
            });
        } else {
            return this.databaseInstance;
        }
    }
}

module.exports = Util;