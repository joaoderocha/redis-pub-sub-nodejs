'use strict';

const { publish } = require('../redis/services/pub-sub');
const {getJsonsFromFile, readBibleCap, termClean} = require('../utils');
const readBibleCap = require('../utils');


async function loadStep() {

    const filePaths =  await getJsonsFromFile();
    
    const linhas = await readBibleCap(filePaths);

    for (const linha of linhas) {
      
      const message = {
        linha,
        queueIndex: roundRobinIndex,
      }

      publish(termClean(roundRobinIndex), message);
    }
}

loadStep();
