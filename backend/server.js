const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log(err);
    console.log('Uncaught Exception 🔥 Shutting down...');
    // server.close( () => {
        process.exit(1);
    // });
})

const app = require('./app');

dotenv.config({ path: './.config.env'});

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`The app is listening on port ${port}`);
    console.log(process.env.NODE_ENV);
});

let database = process.env.DATABASE_SERVER.replace(/<password>/g, process.env.DATABASE_PASSWORD);
database = database.replace(/<dbname>/g, process.env.DATABASE_NAME);
mongoose.connect(database, {  
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connection successfully');
});

process.on('unhandledRejection', err => {
    console.log(err);
    console.log('Unhandled Rejection 🔥 Shutting down...');
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', err => {
    console.log('SIGTERM RECEIVED! Shutting down gracefully');
    server.close(()=> {
        process.exit(1);
    })
})
