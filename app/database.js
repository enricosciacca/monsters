const sqlite3 = require('sqlite3').verbose();
const util = require("util");

let db;

let tableDef = "CREATE TABLE IF NOT EXISTS monsters (" +
               "id INTEGER PRIMARY KEY, " +
               "nome TEXT, " +
               "dv TEXT, " +
               "ca INTEGER, " +
               "attacco TEXT, " +
               "attacchiperturno INTEGER, " +
               "descrizione TEXT );" +
              "CREATE TABLE IF NOT EXISTS special_attacks (" +
              "id INTEGER PRIMARY KEY, " +
              "id_monster INTEGER REFERENCES monsters(id), " +
              "descr TEXT, " +
              "attacco TEXT );";


module.exports.connect = function(dbfile, cb ) {
  if (!dbfile)
    dbfile = ":memory:";

  db = new sqlite3.Database(dbfile, (err) => {
    if (err && typeof cb === 'function') cb(err);
    else db.run(tableDef, cb);
  });
}

module.exports.monsterAll = function(cb) {
  db.all( "SELECT * FROM monsters", cb );
}

module.exports.monsterGet = function(id, cb) {
  db.get("SELECT * FROM monsters WHERE id=?", id, cb );
}


const table_monsters_columns = [ 'nome', 'dv', 'ca', 'attacco', 'attacchiperturno', 'descrizione' ];


module.exports.monsterIns = function(monster,  cb) {
  let values_array = [];
  for (x of table_monsters_columns) {
    values_array.push( monster[x] );
  }
  db.run("INSERT INTO monsters (nome, dv, ca, attacco, attacchiperturno, descrizione) VALUES (?,?,?,?,?,?)",
    values_array, function(err) {
      if (err) cb(err);
      else cb(null, this.lastID);
    });
}

module.exports.monsterUpd = function(monster_id, monster, cb) {
  let values_array = [];
  let values_strings = [];
  for (x of table_monsters_columns) {
    values_array.push( monster[x] );
    values_strings.push( x + "=?" );
  }
  values_array.push( monster_id );

  db.get("UPDATE monsters SET " + values_strings.join() + " WHERE id=?",
          values_array, cb );
}

module.exports.monsterDel = function(monster_id, cb) {
  db.run("DELETE FROM monsters WHERE id=?", monster_id, cb );
}

module.exports.close = function(cb = ()=>{} ) {
  db.close( (err) => {
    if (err) return cb(err);
    console.log("Database chiuso");
    cb();
  });
}

// -------------------------------------------------------------------------
// Promise: versione delle funzioni precedenti "promisified"
let promisified = {};

for (x in module.exports) {
  promisified[x] = util.promisify( module.exports[x] );
}
module.exports.promises = promisified;
