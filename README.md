
COME USARE
==============================================================================
```
npm install
npm start
```
Nella cartella "docs" è incluso un Export della configurazione di Insomnia

MONSTERS
==============================================================================

1. Mostro, oggetto "in JSON"
```
  nome              Stringa, es. "Cubo gelatinoso"
  dv                "Dadi vita": stringa, es. "4d6"
  ca                "Classe armatura": intero, es. 7
  attacco           Dadi di attacco, stringa es. "1d4+1" (somiglia ai dadi vita)
  attacchiperturno  Intero, numero di attacchi in un turno, es. 1
  descrizione       Stringa, testo libero
  id                Intero, identificativo univoco (AKA chiave primaria)
```

2. definizione della base dati da utilizzare per l'oggetto (Tabella SQL)

3. Server Express con API RESTful
 - Modulo gestione db, con funzione di connessione e inizializzazione
 - API per:
      - inserimento
      - lista completa
      - restituzione singolo elemento
      - modifica
      - eliminazione


-------------

### API:

```
REQUEST              RESPONSE     STATUS   SIGNIFICATO
----------------------------------------------------------------------------
GET    /monsters      Array       200      Tutti i mostri
GET    /monsters/:id  Oggetto     200      Singolo mostro
POST   /monsters      Oggetto     201      Aggiunta di un nuovo mostro
PUT    /monsters/:id  Oggetto     200      Aggiornamento del mostro
DELETE /monsters/:id  (vuoto)     204      Rimozione mostro
```
