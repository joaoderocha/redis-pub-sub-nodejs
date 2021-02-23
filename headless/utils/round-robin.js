'use strict';

const indexSize = 1

exports.getRoundRobinIndex = function getRoundRobinIndex(index) {
  return index % indexSize + 1;
}

exports.roundRobinSize = indexSize;
