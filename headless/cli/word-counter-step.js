'use strict';

const { services: {pubSub:{publish}}} = require('../redis');
const {getNextStep, messageBuilder, roundRobinSubscribe, WORDCOUNT} = require('../utils');

function wordCounterStep(channel, message) {
    const {linha, queueIndex} = message;

    const result = countWords(linha);

    const msg = messageBuilder(result, queueIndex);

    publish(getNextStep(channel), msg);
}

function countWords(linha) {
    return linha.split(' ').reduce((cnt, ele) => {
        if(!cnt[ele]) {
            cnt[ele] = 1;

            return cnt;
        }

        cnt[ele] += 1;

        return cnt;
    },{});
}

roundRobinSubscribe(WORDCOUNT, wordCounterStep);
