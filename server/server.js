require('./config/config');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

//POST /todos
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send = doc;
    }, (e) => {
        res.status(400).send(e);
    })
    //    console.log(req.body);
});

//GET /todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send(todos);
    }, (err) => {
        res.send.status(404).send(err);
    })
});

//GET /todos by ID
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todos) => {
        if (!todos) {
            return res.status(404).send();
        }

        res.send({
            todos
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

//DELETE /todos by ID
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todos) => {
        if (!todos) {
            return res.status(404).send();
        }
        console.log(todos);
        res.status(200).send({
            todos
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

// UPDATE /todos by ID
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
        res.status(200).send({
            todo
        });
    }).catch((e) => {
        res.status(400).send();
    })

});

// POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then((user) => {
        return user.generateAuthToken();
    }).catch((e) => {
        res.status(400).send(e);
    }).then((token) => {
        res.header('x-auth', token).send(user);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
})

app.listen(3000, () => {
    console.log('Started on port 3000');
});


module.exports = {
    app
};
