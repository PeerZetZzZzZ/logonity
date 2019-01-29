const { Pool } = require('pg');
const AE_DB_MODEL_SCRIPTS = require('./AE_DB_MODEL_SCRIPTS');

/* eslint-disable */
// pools will use environment variables
// for connection information
const pool = new Pool({
  user: global.properties.postgresUser,
  host: global.properties.postgresHost,
  database: global.properties.postgresDatabase,
  password: global.properties.postgresPassword,
  port: global.properties.postgresPort,
});

pool.query(AE_DB_MODEL_SCRIPTS.CREATE_DATABASE_SQL, (err) => {
  if (err) {
    console.log('Initializing Logonity db with create database script failed!', err);
  } else {
    console.log('Initializing Logonity db with create database script succeed.');
  }
});

exports.pool = pool;
