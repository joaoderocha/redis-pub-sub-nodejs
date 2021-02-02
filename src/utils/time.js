'use strict';

module.exports = (tempo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tempo);
    }, tempo);
  });
};
