/**
 * Created by hbzhang on 9/15/15.
 */
'use strict';
module.exports = {

    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            database: 'kalamata_sample',
            //user:     'root',
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
