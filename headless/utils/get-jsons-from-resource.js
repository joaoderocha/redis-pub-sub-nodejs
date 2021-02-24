'use strict';

const fs = require('fs');
const path = require('path');

exports.getJsonsFromFile = async function getJsonsFromFile() {
  const dirPath = path.join('resources', 'biblia_acf');

  return fs.readdirSync(dirPath).map((filePath) => filePath = path.join(dirPath,filePath));
};
