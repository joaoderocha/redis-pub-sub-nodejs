'use strict';

const { services: {pubSub: {subscribe}} } = require('../redis');


function action(channel, message) {
  console.log(`channel ${channel} recebeu ${message}`)
}

subscribe('teste', action);

console.log("rodei tbm e nao bloqueei");

subscribe('outroCanal', action)
