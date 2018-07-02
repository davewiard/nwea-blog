/**
 * 
 * @param {*} app 
 */
let appRouter = function(app) {

  const { MongoClient } = require("mongodb");
  const mongoClient = require('mongodb').MongoClient;
  const mongoUri = 'mongodb://localhost:27017/msp';

  app.get('/all-trades', function(req, res) {
    mongoClient.connect(mongoUri, function(err, db) {
      console.log('Connected');
      console.log('getting all trades');
      res.send('getting all trades');
      db.close();
    });

  });

  app.get("/", function(req, res) {
    (async function() {
      try {
        const client = await MongoClient.connect(mongoUri, {useNewUrlParser: true});

        const db = client.db('msp');

        const docs = await db.collection('trades')
                                  .find()
                                  .sort({'trade_date': -1})
                                  .toArray();
//        console.log(docs);
        res.send(docs);

        client.close();
      } catch(e) {
        console.error(e)
      }
    })();
  });

}

module.exports = appRouter;
