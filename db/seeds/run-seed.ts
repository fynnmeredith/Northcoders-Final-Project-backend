const devData = require('../data/dev-data/index.ts');
const seed = require('./seed.ts');
const db = require('../connection.ts');

const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();
