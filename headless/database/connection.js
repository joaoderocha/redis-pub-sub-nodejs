'use strict';

const { MongoClient } = require('mongodb');

let client, db;

async function connect() {
  if (client && client.isConnected()) {
    return true;
  }

  client = await MongoClient.connect('mongodb://localhost',{
    useUnifiedTopology: true
  });

  db = client.db('tp-sd');

  return client.isConnected();
}

function disconnect() {
  return client && client.disconnect();
}

function getDB() {
  return db;
}

module.exports = {
  connect,
  disconnect,
  getDB,
};
