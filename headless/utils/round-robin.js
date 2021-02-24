'use strict';

const { getPreviousStep } = require("./resolves-channel");

const indexSize = 1

exports.getRoundRobinIndex = function getRoundRobinIndex(index) {
  return index % indexSize + 1;
}

function roundRobinSubscribe(currentStep, action) {

  for (let index = 1; index <= roundRobinSize; index++) {
    subscribe(getPreviousStep(currentStep), action);
  }

}

exports.roundRobinSize = indexSize;
exports.roundRobinSubscribe = roundRobinSubscribe;
