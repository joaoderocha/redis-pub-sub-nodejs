'use strict'

const { services: { pubSub: { subscribe } } } = require('../redis')

const action = (channel, message) => {
  console.log(`channel ${channel} received ${message}`)
}

subscribe('test', action)

console.log('rodei tbm e nao bloqueei')

subscribe('otherChannel', action)
