'use strict';

const redis = require('redis');

// const sleep = require('../utils/time');
const crawler = require('../utils/crawler');

const redisConf = require('../config/redisConf');
const publisher = redis.createClient(redisConf);

(async () => {
  while (true) {
    const user = 'elonmusk';
    console.log(`Collect last tweet from @${user}`);
    const data = await crawler(user);
    const message = `@${user} tweetou: ${data[0].tweet}`;
    publisher.publish(user, JSON.stringify(message));
  }
})();
