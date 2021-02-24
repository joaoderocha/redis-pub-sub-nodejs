'use strict';

const { redisClient, subscriptionMap } = require('../../connection');

exports.subscribe = async (channel, action) => {
  subscriptionMap.set(channel, action);
  redisClient.subscribe(channel);
};
