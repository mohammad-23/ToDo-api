const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const port = (process.env.PORT || 3000);

const todos = [{
  _id: new ObjectID(),
    text: '1st todo'
}, {
    id: new ObjectID(),
    text: '2nd todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});


describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'TODO TEXT';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });
});


//describe('GET /todos', () => {
//    it('should get todo', (done) => {
//       request(app)
//        .get('/todos')
//        .expect(200)
//        .expect((res) => {
//           expect(res.body.todos.length).toBe(2);
//       })
//        .end(done);
//    });
//});

describe('GET /todos/:id', () => {
    it('Should get todos for the id', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });
    it('Should retunr 404 if todo not found', (done) => {
        var hexID = new ObjectID().toHexString();
        
        request(app)
        .get(`/todos/${hexID}`)
        .expect(404)
        .end(done);
    })
});
        

















