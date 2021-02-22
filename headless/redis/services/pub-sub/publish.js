'use strict';

const { redisClient }= require('../../connection');

exports.publish =async function publish(channel, mensagem) {
  return new Promise((resolve, reject) => {
    try {
      resolve(redisClient.publish(channel, JSON.stringify(mensagem)));
    } catch (error) {
      reject(error);
    }
  });  
}
