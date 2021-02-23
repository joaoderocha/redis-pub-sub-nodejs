'use strict';

const prefixes = {
  LOAD: 'load',
  TERM_CLEAN: 'term_clean',
  WORD_CLEAN: 'word_clean',
  WORD_COUNT: 'word_count',
  REDUCE: 'reduce',
}


function addSufix(string, index) {
  return `${string}_${index}`;
}

const step = {
  termClean(roundRobinIndex){
    return addSufix(prefixes.TERM_CLEAN,roundRobinIndex);
  },
  wordClean(roundRobinIndex){
    return addSufix(prefixes.WORD_COUNT, roundRobinIndex);
  },
  wordCound(roundRobinIndex){
    return addSufix(prefixes.WORD_COUNT, roundRobinIndex);
  },
  reducer(roundRobinIndex){
    return addSufix(prefixes.REDUCE, roundRobinIndex);
  }
}

module.exports = {
  ...step
}
