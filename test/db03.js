const db = require("../app/database").promises;

const m1 = {
	"nome": "Scheletro",
	"dv": "4d8+32",
	"ca": 4,
	"attacco": "1d4+1",
	"attacchiperturno": 1,
	"descrizione": "Non Morto. Ma neanche vivo. Ma non morto."
};
const m2 = {
	"nome": "Scheletrone",
	"dv": "4d8+32",
	"ca": 5,
	"attacco": "1d4+1",
	"attacchiperturno": 1,
	"descrizione": "Non Morto. Ma neanche vivo. Ma non morto."
};

// Con ASYNC e AWAIT

(async function() {

  try {
    await db.connect(false);
    console.log("Connessione");

    let lastId = await db.monsterIns( m1 );
    console.log("Inserito mostro #" + lastId);

    let monsters = await db.monsterAll();
    console.log("Tutti i mostri: ", monsters);

    await db.monsterUpd(1, m2);
    console.log("Modificato il mostro #1");

    let monster = await db.monsterGet(1);
    console.log("Mostro #1 modificato", monster);

    await db.monsterDel(1);
    console.log("Mostro #1 eliminato");

    let monsters2 = await db.monsterAll();
    console.log("Tutti i mostri: ", monsters2);

    db.close();

  } catch(err) {
      console.error(err.message);
      process.exit(1);
  }

})();
