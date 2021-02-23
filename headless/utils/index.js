'use strict'

module.exports = {
  sleep: require('./time'),
  ...require('./process'),
  ...require('./resolves-channel'),
  ...require('./get-jsons-from-resource'),
  ...require('./readBibleLine'),
  ...require('./round-robin'),
}
