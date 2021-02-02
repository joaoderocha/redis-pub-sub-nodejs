'use strict';

const sleep = require('../utils/time');
const redis = require('redis');

const redisConf = require('../config/redisConf');
const publisher = redis.createClient(redisConf);

(async () => {
  while (true) {
    console.log('sending...');
    publisher.publish('teste', JSON.stringify('Hello'));
    await sleep(2000);
  }
})();
