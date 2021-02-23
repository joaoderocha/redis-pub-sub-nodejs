'use strict';

const { publish } = require('../redis/services/pub-sub');
const {getJsonsFromFile, readBibleCap, termClean, getRoundRobinIndex} = require('../utils');


async function loadStep() {

    const filePaths =  await getJsonsFromFile();
    let index = 0;
    for (const filePath of filePaths) {
      
      const linhas = await readBibleCap(filePath);
      
      for (const linha of linhas) {
        
        const message = {
          linha,
          queueIndex: getRoundRobinIndex(index),
        }
        
        publish(termClean(roundRobinIndex), message);
        index++;
      }
    }
}

loadStep();
