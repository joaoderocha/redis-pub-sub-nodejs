'use strict';

const {services:{pubSub:{subscribe}}} = require('../redis');
const {termClean} = require('../utils')

subscribe(termClean(1), action)

function action(channel, message) {
  console.log(`${channel} e linha: ${message}`);
}
