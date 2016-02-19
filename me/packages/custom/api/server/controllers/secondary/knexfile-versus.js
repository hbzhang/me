/**
 * Created by hbzhang on 9/18/15.
 */
'use strict';
module.exports = {

    development: {
        client: 'mysql',
        connection: {
            host: '128.173.129.207',
            database: 'signup',
            user:     'root',
            password: 'sv4recNOW!3koEEukDuA',
            port: '3306',
            connection: process.env.DATABASE_URL
        },
        seeds: {
            directory: './db/seeds'
        },
        migrations: {
            directory: './db/migrations'
        }
    }

};
