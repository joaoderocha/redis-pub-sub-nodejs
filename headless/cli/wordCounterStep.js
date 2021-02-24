'use strict';

const { services: {pubSub:{publish,subscribe}}} = require('../redis');
const {wordCount, getNextStep, messageBuilder, roundRobinSize, roundRobinSubscribe, WORDCOUNT} = require('../utils');

async function wordCounterStep(channel, message) {

    const {linha, queueIndex} = message;
    
    const result = countWords(linha);

    const message = messageBuilder(result, queueIndex);

    publish(getNextStep(channel), message);
}

function countWords(linha) {

    const novaLinha = new String(linha);

    let i;
    return novaLinha.split(' ').reduce((cnt, ele) => {

        if(!cnt[ele]) {
            cnt[ele] = 1;
            return cnt;
        }
        cnt[ele] = cnt[ele] + 1;

        return cnt;
    },{})

}

roundRobinSubscribe(WORDCOUNT, wordCounterStep);