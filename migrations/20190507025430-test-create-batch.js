'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('bootcamp_batch1', {
    id: { type: 'int', primaryKey: true },
    name: 'string',
    start_date: 'date',
    finish_date: 'date'
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
