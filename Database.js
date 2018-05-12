const config = require('config');

module.exports = require('knex')({
    client: 'mysql2',
    connection: {
        host: config.get('mysql.host'),
        user: config.get('mysql.username'),
        password: config.get('mysql.password'),
        database: config.get('mysql.database'),
    }
});
