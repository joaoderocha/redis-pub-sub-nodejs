'use strict';

const { redisClient, subscriptionMap }= require('../../connection');

exports.subscribe = async function subscribe(canal, acao) {
  subscriptionMap.set(canal, acao);
  redisClient.subscribe(canal);
}
