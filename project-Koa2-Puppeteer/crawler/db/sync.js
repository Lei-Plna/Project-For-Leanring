/**
 *  Syncs the database with the models.
 */
const seq = require('./connection/mysql'),
  models = require('./models');

seq.authenticate().then(() => {
  console.log('connection');
}).catch(err => {
  console.log('connect error');
});

// Sync all models that are not already in the database
seq.sync({
  force: true
}).then(() => {
  console.log('The table has been synchronized into the database successfully.');
  process.exit(0);
});