const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB server');
    
    
    db.collection('Users').find({name: 'Mohammad'}).count().then((count) => {
        console.log(`Users with name Mohammad: ${count}`);
    }, (err) => {
        console.log('Unable to fetch Users', err);
    });
    
    
//    db.close();
})