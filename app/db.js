const mysql = require('mysql');
const async = require('async');

const PRODUCTION_DB = 'NULL';
const DEV_DB = 'notes_competencesdb';

exports.MODE_PRODUCTION = 'mode_production';
exports.MODE_DEV = 'mode_dev';

const state = {
  pool: null,
  mode: null
};

exports.connect = function (mode, done) {
  state.pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : DEV_DB
  });

  state.mode = mode;
  done();
}

exports.get = function () {
  return state.pool;
}

exports.fixtures = function (data, done) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  var names = Object.keys(data.tables)
  async.each(names, function (name, cb) {
    async.each(data.tables[name], function (row, cb) {
      var keys = Object.keys(row),
        values = keys.map(function (key) {
          return "'" + row[key] + "'"
        })

      pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
    }, cb)
  }, done)
}

exports.drop = function (tables, done) {
  var pool = state.pool;
  if (!pool) return done(new Error('Error, No connection to database.'));

  async.each(tables, function (name, cb) {
    pool.query('DELETE FROM ' + name, cb)
  }, done)
}