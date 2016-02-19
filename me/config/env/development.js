'use strict';

module.exports = {
  db: 'mongodb://localhost/productdev',
	debug: 'true',
  mongoose: {
    debug: false
  },
  app: {
    name: '3.2 Mile Run'
  },
  facebook: {
    clientID: 'DEFAULT_APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  twitter: {
    clientID: 'DEFAULT_CONSUMER_KEY',
    clientSecret: 'CONSUMER_SECRET',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  },
  github: {
    clientID: 'DEFAULT_APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  google: {
    clientID: 'DEFAULT_APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  linkedin: {
    clientID: 'DEFAULT_API_KEY',
    clientSecret: 'SECRET_KEY',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  },
  mailer: {
    auth: {
      pass: 'vtrecsportsmail123',
      user: 'vtrecsportsmail@gmail.com'
    },
    service: 'Gmail'
  },
  emailFrom : 'VT Recsports' // sender address like ABC <abc@example.com>
};
