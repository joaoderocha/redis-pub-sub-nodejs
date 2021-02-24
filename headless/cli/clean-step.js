'use strict';

const {services:{pubSub:{subscribe, publish}}} = require('../redis');
const {termClean, messageBuilder, roundRobinSize, getNextStep} = require('../utils');

function action(channel, message) {
  const {linha, queueIndex} = message;

  const linhaSemAcentos = cleanTerms(linha);

  const linhaLimpa = cleanPunctuation(linhaSemAcentos);

  const msg = messageBuilder(linhaLimpa, queueIndex);

  publish(getNextStep(channel), msg);
}

function cleanTerms(linha) {
  return linha.normalize('NFD');
}

function cleanPunctuation(linha) {
  return linha.replace(/[.*.,+?^${}()~!@#$:|[\]\\]/gi, '');
}

for (let index = 1; index <= roundRobinSize; index+=1) {
  subscribe(termClean(index), action);
}
