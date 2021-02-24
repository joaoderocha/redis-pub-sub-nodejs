'use strict';

const redis = require('redis');

const redisConfig = require('../config/redis');
const redisClient = redis.createClient(redisConfig);

const subscriptionMap = new Map();

redisClient.on('message', async (channel, message) => {
  const action = subscriptionMap.get(channel);

  if (!action) {
return;
}

  await action(channel, message);
});

module.exports = {
  redisClient,
  subscriptionMap
};
