'use strict';

const { services: {pubSub:{publish}}, redisClient } = require('../redis');
const {getJsonsFromFile, readBibleCap, getRoundRobinIndex,sleep, messageBuilder, getNextStep, LOAD} = require('../utils');

async function loadStep() {
    const filePaths = await getJsonsFromFile();
    let index = 0;

    for (const filePath of filePaths) {
      const linhas = await readBibleCap(filePath);

      for (const linha of linhas) {
        const roundRobinIndex = getRoundRobinIndex(index);

        const message = messageBuilder(linha, roundRobinIndex);

        console.log(getNextStep(`${LOAD}_${roundRobinIndex}`), message);

        publish(getNextStep(`${LOAD}_${roundRobinIndex}`), message);
        await sleep(2000);
        index+=1;
      }
    }

    redisClient.quit();
}

loadStep();
