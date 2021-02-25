'use strict';

const { getDB,subscribeChanges } = require('./connection');

module.exports = {
  cadastrar(dadosReduce){
    return getDB().collection('ReduceStep').insertOne(dadosReduce).then(({ops: [doc]}) => doc);
  },
  find(query, {limit=0, skip=0, ...options} = {}){
    return getDB().collection('ReduceStep').find(query, options).limit(limit).skip(skip).toArray();
  },
  update(query, data){
    return getDB().collection('ReduceStep').findOneAndUpdate(query, { $set: data }, { returnOriginal: false })
    .then(({ value: doc }) => doc);
  },
  findAndRemove(query){
    return getDB().collection('ReduceStep').findAndModify({query, remove: true});
  },
  watchDatabase({pipeline, options, action}){
    subscribeChanges(pipeline,options).on('change', action);
  }
};
