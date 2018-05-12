import * as config from "config";
import * as knex from "knex";

export default knex({
    client: 'mysql2',
    connection: {
        host: config.get('mysql.host'),
        user: config.get('mysql.username'),
        password: config.get('mysql.password'),
        database: config.get('mysql.database'),
    }
});