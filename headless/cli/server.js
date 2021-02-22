'use strict'

const { publish } = require('../redis/services/pub-sub/publish')
const sleep = require('../utils/time')

const publishing = async () => {
  while (true) {
    console.log('sending...')
    publish('test', JSON.stringify('Hello'))
    publish('otherChannel', JSON.stringify('Hello 2'))
    await sleep(2000)
  }
}

publishing()
