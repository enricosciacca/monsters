const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./database");


const app = express();
app.use( morgan('dev') );  // fancy HTTP log
app.use( express.json() ); // body parser for Content-Type: application/json
app.use(cors());  //CORS default: allow all


// Routes

app.post("/monsters", (req, res, next) => {
  db.monsterIns(req.body, (err, lastId) => {
    if (err) return next(err);

    db.monsterGet(lastId, (err, monster) => {
      if (err) return next(err);
      res.json( monster );
    });
  });
});

app.get("/monsters", (req, res, next) => {
  db.monsterAll( (err, monsters) => {
    if (err) return next(err);
    res.json( monsters );
  });
});

app.get("/monsters/:id", (req, res, next) => {
  db.monsterGet(req.params.id, (err, monster) => {
    if (err) return next(err);
    if (!monster) return next();
    res.json( monster );
  });
});

app.put("/monsters/:id", (req, res, next) => {

  db.monsterGet(req.params.id, (err, monster) => {
    if (err) return next(err);
    if (!monster) return next();

    db.monsterUpd(req.params.id, req.body, (err) => {
      if (err) return next(err);

      db.monsterGet(req.params.id, (err, monster) => {
        if (err) return next(err);
        res.json( monster );
      });
    });
  });
});

app.delete("/monsters/:id", (req, res, next) => {
  db.monsterDel(req.params.id, (err, monster) => {
    if (err) return next(err);
    res.status(204).end();
  });
});


app.post("/monsters/:id/special", (req, res, next) => {
  db.monsterGet(req.params.id, (err, monster) => {
    if (err) return next(err);
    if (!monster) return next();

    db.specialIns(req.params.id, req.body, (err) => {
      if (err) return next(err);

      db.monsterGet(req.params.id, (err, monster) => {
        if (err) return next(err);
        res.json( monster );
      });
    });
  });
});


app.del("/monsters/:id/special/:idspecial", (req, res, next) => {
  db.specialDel(req.params.idspecial, (err) => {
    if (err) return next(err);
    res.status(204).end();
  });
});



// pagina 404
app.use( (req, res, next) => {
  res.status(404).end();
});

// error handler
app.use( (err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).end();
});


module.exports.start = function(dbfile, port) {
  db.connect(dbfile,  (err) => {
      if (err) throw err;
      console.log("Database connected.")
      app.listen(port, () => console.log("Listenting on port " + port));
  });
}
