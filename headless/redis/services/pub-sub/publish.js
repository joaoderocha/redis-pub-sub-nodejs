'use strict'

const { redisClient } = require('../../connection')

exports.publish = async (channel, message) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(redisClient.publish(channel, JSON.stringify(message)))
    } catch (error) {
      reject(error)
    }
  })
}
