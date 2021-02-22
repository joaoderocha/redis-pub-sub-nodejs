'use strict';

const redis = require('redis');
const redisConf = require('../redisConf.json');
const redisClient  = redis.createClient(redisConf);

const subscriptionMap = new Map();

redisClient.on('message',async (channel, message) =>{
  const acao = subscriptionMap.get(channel)
  
  if (!acao) {
    return
  }

  await acao(channel, message);
});

module.exports = {
  redisClient,
  subscriptionMap,
}
