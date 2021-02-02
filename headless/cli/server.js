'use strict';

const sleep = require('../utils/time');
const redis = require('redis');
const redisConf = require('../redisConf.json');
const publisher  = redis.createClient(redisConf);



async function publishing() {
  while (true) {
    console.log("sending...");
    publisher.publish('teste', JSON.stringify("Hello"));
    await sleep(2000);
  }
}

publishing();
