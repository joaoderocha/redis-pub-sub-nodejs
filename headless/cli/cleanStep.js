'use strict';

const {services:{pubSub:{subscribe, publish}}} = require('../redis');
const {termClean, messageBuilder, roundRobinSize} = require('../utils')


function action(channel, message) {
  const {linha, queueIndex} = message;

  const linhaLimpa = cleanTerms(linha);

  const message = messageBuilder(linhaLimpa, queueIndex);

  publish(channel, message);
}

function cleanTerms(linha) {
  return linha.normalize('NFD');
}

for (let index = 1; index <= roundRobinSize; index++) {
  subscribe(termClean(index), action)
}
