'use strict';

const { services: {pubSub:{publish}}, redisClient } = require('../redis');
const {getJsonsFromFile, readBibleCap, termClean, getRoundRobinIndex,sleep} = require('../utils');


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
        sleep(2000);
        index++;
      }
    }

    redisClient.quit();
}

loadStep();
