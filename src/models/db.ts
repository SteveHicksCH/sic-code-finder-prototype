const mongoose = require('mongoose');

import config from "../config";

const connect = () => {
    setTimeout(() => mongoose.connect(config.dbURI, { useNewUrlParser: true }), 1000);
  }

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${config.dbURI}`);
});
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
    console.log('Exiting application');
    process.exit(1);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
const gracefulShutdown = (msg, callback) => {
   mongoose.connection.close( () => {
      console.log(`Mongoose disconnected through ${msg}`);
      callback();
   });
};
// For nodemon restarts
process.once('SIGUSR2', () => {
      gracefulShutdown('nodemon restart', () => {
      process.kill(process.pid, 'SIGUSR2');
   });
});
// For app termination
process.on('SIGINT', () => {
      gracefulShutdown('app termination', () => {
      process.exit(0);
   });
});

console.log("Connecting to Mongo using [" + config.dbURI + "]")
connect();

require('./combinedSicActivities')
