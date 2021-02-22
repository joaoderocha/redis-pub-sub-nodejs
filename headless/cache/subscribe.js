'use strict';

const { redisClient, subscriptionMap }= require('./connect');

exports.subscribe = async function subscribe(canal, acao) {
  subscriptionMap.set(canal, acao);
  redisClient.subscribe(canal);
}
