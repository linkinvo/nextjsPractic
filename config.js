const merge = require('lodash/merge');

const isDev = process.env.NODE_ENV !== 'production';
const isJest = process.env.JEST_WORKER_ID !== undefined;

if (typeof document !== 'undefined' && !isJest) {
    throw new Error('Do not import `config.js` from inside the client-side code.');
}

const prodConfig = {

    siteName: 'Some Web Site',
    dialect: "mysql",
    baseUrl: 'http://localhost:3000',
    dev: isDev,
    jest: isJest,
    port: process.env.PORT || 3000,
    jwtSecret: 'ubfaWS62u9LXbBVXaCfG263zecqcm692npKdsKG98cpubxfqR6vFJhf3qUbdaj8z',

    db: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        logging: false,        
    },

}

let localConfig = {};
if (isDev) {
    try {
        localConfig = require('./config.local');
    } catch (ex) {
        console.log('ex', ex)
        console.log('config.local does not exist.');
    }
}

module.exports = merge(prodConfig, localConfig);