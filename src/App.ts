import Proxy from "./Proxy"
import knex from "./Database"

knex.select().table("accounts")
.then(function(collection) {
    console.log(collection);
});