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


db.connect(false)
.then( () => {
    console.log("Connessione");
    return db.monsterIns( m1 );
})
.then( (lastId) => {
    console.log("Inserito mostro #" + lastId);
    return db.monsterAll();
})
.then( (monsters) => {
    console.log("Tutti i mostri: ", monsters);
    return db.monsterUpd(1, m2);
})
.then( () => {
    console.log("Modificato il mostro #1");
    return db.monsterGet(1);
})
.then( (monster) => {
    console.log("Mostro #1 modificato", monster);
    return db.monsterDel(1);
})
.then( () => {
    console.log("Mostro #1 eliminato");
    return db.monsterAll();
})
.then( (monsters) => {
    console.log("Tutti i mostri: ", monsters);
    db.close();
})
.catch( (err) => {
    console.error(err.message);
    process.exit(1);
})

// -----------------------------------------------------

// Con ASYNC e AWAIT
/*

async function uso_async_await() {

  try {
    await connectP();
    await createTableP();
    await populateP("EnricoA-A");
    let row = await getOneP(1);
    console.log("Eccolo!", row);
    close();
  } catch(err) {
      console.log("Errore!", err);
  }
}

uso_async_await();
console.log("Stampato dopo");
*/
