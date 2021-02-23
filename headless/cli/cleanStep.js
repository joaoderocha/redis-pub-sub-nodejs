'use strict';

const {services:{pubSub:{subscribe, publish}}} = require('../redis');
const {termClean, messageBuilder, roundRobinSize, getNextStep} = require('../utils')


function action(channel, message) {
  const {linha, queueIndex} = message;

  const linhaSemAcentos = cleanTerms(linha);

  const linhaLimpa = cleanPunctuation(linhaSemAcentos);

  const message = messageBuilder(linhaLimpa, queueIndex);

  publish(getNextStep(channel), message);
}

function cleanTerms(linha) {
  return linha.normalize('NFD');
}

function cleanPunctuation(linha) {
  let novaLinha = new String(linha);

  return novaLinha.replace(/[.*.,+?^${}()~!@#$:|[\]\\]/gi, '');
}



for (let index = 1; index <= roundRobinSize; index++) {
  subscribe(termClean(index), action)
}
