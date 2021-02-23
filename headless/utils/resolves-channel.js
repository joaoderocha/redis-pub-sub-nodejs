'use strict';

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

const step = {
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

function getNextStep(currentStep) {
  const [currentStep, sufixo] = currentStep.split('_');

  return step[currentStep](sufixo);
}

module.exports = {
  ...step,
  getNextStep,
}
