'use strict'

const { redisClient, subscriptionMap } = require('../../connection')

exports.subscribe = async (canal, action) => {
  subscriptionMap.set(canal, action)
  redisClient.subscribe(canal)
}
