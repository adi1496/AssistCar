const path = require('path');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const viewRoutes = require('./routes/viewRoutes');
const carsRoutes = require('./routes/carsRoutes');
const usersRoutes = require('./routes/usersRoutes');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

/******** MIDDLEWARS *********/

app.use(express.json( {limit: '10kb'} ));
//ALLOW REQUESTS FROM EVERYWHERE
app.use(cors({
    origin: 'http://127.0.0.1:8080',
    credentials: true
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static('public'));


app.use('/api/v1/pages', viewRoutes);
app.use('/api/v1/cars', carsRoutes);
app.use('/api/v1/users', usersRoutes);

// handle all the other routes that are not used
app.all('*', (req, res, next) => {
    next(new AppError('Sorry but this route is not defined', 404));
});

app.use(globalErrorHandler);

module.exports = app;