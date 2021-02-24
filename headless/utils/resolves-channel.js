'use strict';

const { WORDCOUNT } = require(".");

const prefixes = {
  LOAD: 'load',
  TERMCLEAN: 'termClean',
  WORDCLEAN: 'wordClean',
  WORDCOUNT: 'wordCount',
  REDUCE: 'reduce',
}


function addSufix(string, index) {
  return `${string}_${index}`;
}


const nextStep = {
  load(roundRobinIndex){
    return addSufix(prefixes.TERMCLEAN,roundRobinIndex);
  },
  termClean(roundRobinIndex){
    return addSufix(prefixes.WORDCLEAN, roundRobinIndex);
  },
  wordClean(roundRobinIndex){
    return addSufix(prefixes.WORDCOUNT, roundRobinIndex);
  },
  wordCound(roundRobinIndex){
    return addSufix(prefixes.REDUCE, roundRobinIndex);
  },
  reducer(roundRobinIndex){
    return addSufix(prefixes.LOAD, roundRobinIndex);
  }
}

const previousStep = {
  load(roundRobinIndex){
    return addSufix(prefixes.REDUCE,roundRobinIndex);
  },
  termClean(roundRobinIndex){
    return addSufix(prefixes.LOAD, roundRobinIndex);
  },
  wordClean(roundRobinIndex){
    return addSufix(prefixes.TERMCLEAN, roundRobinIndex);
  },
  wordCound(roundRobinIndex){
    return addSufix(prefixes.WORDCLEAN, roundRobinIndex);
  },
  reducer(roundRobinIndex){
    return addSufix(prefixes.WORDCOUNT, roundRobinIndex);
  }
}

function getNextStep(currentStep) {
  const [currentStep, sufixo] = currentStep.split('_');

  return nextStep[currentStep](sufixo);
}

function getPreviousStep(currentStep) {
  const [currentStep, sufixo] = currentStep.split('_');

  return previousStep[currentStep](sufixo)
}

module.exports = {
  getPreviousStep,
  getNextStep,
  ...prefixes

}
