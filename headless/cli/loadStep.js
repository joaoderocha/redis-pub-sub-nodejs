'use strict';

const { services: {pubSub:{subscribe}}, redisClient } = require('../redis');
const {getJsonsFromFile, readBibleCap, termClean, getRoundRobinIndex} = require('../utils');


async function loadStep() {

    const filePaths =  await getJsonsFromFile();
    let index = 0;
    for (const filePath of filePaths) {
      
      const linhas = await readBibleCap(filePath);
      
      for (const linha of linhas) {
        
        const roundRobinIndex = getRoundRobinIndex(index)

        const message = {
          linha,
          queueIndex: roundRobinIndex,
        }

        console.log(termClean(roundRobinIndex), message);

        publish(termClean(roundRobinIndex), message);
        index++;
      }
    }

    redisClient.quit();
}

loadStep();
