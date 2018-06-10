import * as request from "request-promise-native"

export default class MailRu {

    /**
     * Get the 'act' token which is required to log in.
     *
     * @param {string} emailAddress
     * @return {Promise}
     */
    static getActToken(emailAddress: string) {
        return new Promise(function(resolve, reject) {
            const options = {
                uri: `https://account.mail.ru/login/?mode=simple&v=2.0.13&type=login&allow_external=1&success_redirect=https%3A%2F%2Fe.mail.ru%2Fmessages%2Finbox%3Fback%3D1&opener=mail.login&email=${emailAddress}&modal=1&parent_url=https%3A%2F%2Fe.mail.ru%2Flogin%3Femail%3D${emailAddress}`,
                method: 'GET',
                simple: false,
                resolveWithFullResponse: true
            };
            request(options)
                .then(function(response) {
                    const token = response.headers['set-cookie'][0].split(' ')[0].replace('act=', '').replace(';', '');
                    resolve(token);
                })
                .catch(reject)
        })
    }

    /**
     * Login to mail.ru using the email address and 'act' token.
     *
     * @param {string} emailAddress
     * @param {string} emailPassword
     * @param {string} actToken
     * @return {Promise}
     */
    static login(emailAddress: string, emailPassword: string, actToken: string) {
        return new Promise(function(resolve, reject) {
            const options = {
                uri: 'https://auth.mail.ru/cgi-bin/auth',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Origin': 'https://account.mail.ru'
                },
                formData: {
                    new_auth_form: 1,
                    page: 'https://e.mail.ru/messages/inbox?back=1&from=mail.login',
                    act_token: actToken,
                    back: 1,
                    FromAccount: `v=2.0.13&type=login&allow_external=1&opener=mail.login&modal=1&parent_url=https%3A%2F%2Fe.mail.ru%2Flogin%3Femail%3D${emailAddress}`,
                    Login: emailAddress,
                    Password: emailPassword,
                    saveauth: 1
                },
                resolveWithFullResponse: true,
                simple: false
            };

            request(options)
                .then(resolve)
                .catch(reject);
        })
    }
}