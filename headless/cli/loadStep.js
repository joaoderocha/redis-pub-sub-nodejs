'use strict';

const { publish } = require('../redis/services/pub-sub');
const {getJsonsFromFile, readBibleCap, termClean} = require('../utils');


async function loadStep() {

    const filePaths =  await getJsonsFromFile();
    
    for (const filePath of filePaths) {
      
      const linhas = await readBibleCap(filePath);
      
      for (const linha of linhas) {
        
        const message = {
          linha,
          queueIndex: roundRobinIndex,
        }
        
        publish(termClean(roundRobinIndex), message);
      }
    }
}

loadStep();
