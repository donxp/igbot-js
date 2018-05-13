import Proxy from "./Proxy"
import knex from "./Database"
import Account from "./Account"

Account.loadAll().then(() => {
    console.log('Number of accs:', Account.All.length);

    let proxy = new Proxy(24000);
    Account.All[3].createCookieStorage();
    Account.All[3].attachProxy(proxy);
    Account.All[3].getRelationship('drake')
        .then(function(rel) {
            console.log(rel);
        })
        .catch((err) => console.log(err));

    console.log(Account.All[0].cookieMemoryStorage)
})