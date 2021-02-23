'use strict'

const { redisClient } = require('../../connection')

exports.publish = async (channel, message) => {
      redisClient.publish(channel, JSON.stringify(message));
}
