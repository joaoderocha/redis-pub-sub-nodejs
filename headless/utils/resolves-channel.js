'use strict';

const prefixes = {
  LOAD: 'load',
  TERMCLEAN: 'termClean',
  WORDCLEAN: 'wordClean',
  WORDCOUNT: 'wordCount',
  REDUCE: 'reduce',
};

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
  wordCount(roundRobinIndex){
    return addSufix(prefixes.REDUCE, roundRobinIndex);
  },
  reducer(roundRobinIndex){
    return addSufix(prefixes.LOAD, roundRobinIndex);
  }
};

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
  wordCount(roundRobinIndex){
    return addSufix(prefixes.WORDCLEAN, roundRobinIndex);
  },
  reducer(roundRobinIndex){
    return addSufix(prefixes.WORDCOUNT, roundRobinIndex);
  }
};

function getNextStep(currentStep) {
  const [currStep, sufixo] = currentStep.split('_');

  return nextStep[currStep](sufixo);
}

function getPreviousStep(currentStep) {
  const [currStep, sufixo] = currentStep.split('_');

  return previousStep[currStep](sufixo);
}

module.exports = {
  getPreviousStep,
  getNextStep,
  ...prefixes

};
