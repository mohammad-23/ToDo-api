const MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    
    db.collection('ToDo').findOneAndUpdate({
        text: 'Drink Water'
    }, {$set: 
        {completed: true}
       }, (err, result) => {
        if(err) {
            return console.log('Unable to Update');
        }
        console.log(JSON.stringify(result, undefined, 2));
    })



    db.close();
});
