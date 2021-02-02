'use strict';

const redis = require('redis');

const redisConf = require('../config/redisConf');
const subscriber = redis.createClient(redisConf);

subscriber.on('message', (channel, message) => {
  console.log(`channel ${channel} recebeu ${message}`);
});

const user = 'elonmusk';
subscriber.subscribe(user);
