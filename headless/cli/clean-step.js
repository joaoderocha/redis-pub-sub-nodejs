'use strict';

const {services:{pubSub:{publish}}} = require('../redis');
const {messageBuilder, getNextStep, roundRobinSubscribe, TERMCLEAN} = require('../utils');

function termCleanStep(channel, message) {
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

roundRobinSubscribe(TERMCLEAN, termCleanStep);
