const env = process.env.NODE_ENV || 'developement';

if (env === 'developement') {

    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/ToDoApp'
} else if (env === 'test') {

    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/ToDoAppTest'
}
