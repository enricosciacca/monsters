const db = require("../app/database");

const m1 = {
	"nome": "Scheletro",
	"dv": "4d8+32",
	"ca": 4,
	"attacco": "1d4+1",
	"attacchiperturno": 1,
	"descrizione": "Non Morto. Ma neanche vivo. Ma non morto."
};
const m2 = {
	"nome": "Scheletro modificato",
	"dv": "4d8+32",
	"ca": 5,
	"attacco": "1d4+1",
	"attacchiperturno": 1,
	"descrizione": "Non Morto. Ma neanche vivo. Ma non morto."
};


db.connect(false,  (err) => {
    if (err) throw err;
    console.log("Connessione");

    db.monsterIns( m1,  (err) => {
        if (err) throw err;
        console.log("Inserimento mostro");

        db.monsterAll( (err, monsters) => {
            if (err) throw err;
            console.log("Tutti i mostri: ", monsters);

            db.monsterUpd(1, m2, (err) => {
                if (err) throw err;
                console.log("Modifico il mostro #1");

                db.monsterGet(1, (err, monster) => {
                    if (err) throw err;
                    console.log("Mostro #1 modificato", monster);

                    db.monsterDel(1, (err) => {
                        if (err) throw err;
                        console.log("Mostro #1 eliminato");

                        db.monsterAll( (err, monsters) => {
                            if (err) throw err;
                            console.log("Tutti i mostri: ", monsters);

                            db.close();
                        });
                    });
                });
            });
        });
    });
});
