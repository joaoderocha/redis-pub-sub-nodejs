'use strict';

const { redisClient, subscriptionMap } = require('../../connection');

exports.subscribe = (channel, action) => {
  subscriptionMap.set(channel, action);
  redisClient.subscribe(channel);
};
