const MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Users').insertOne({
        name: 'Mohammad',
        age: 23
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert user', err);
        }
        console.log(result.ops);
    })



    db.close();
});
