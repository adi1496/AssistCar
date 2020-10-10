const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const viewRoutes = require('./routes/viewRoutes');
const carsRoutes = require('./routes/carsRoutes');
const usersRoutes = require('./routes/usersRoutes');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

/******** MIDDLEWARS *********/

//ALLOW REQUESTS FROM EVERYWHERE
app.use(express.json( {limit: '10kb'} ));
app.use(cors());
app.use(morgan('dev'));


app.use('/api/v1/pages', viewRoutes);
app.use('/api/v1/cars', carsRoutes);
app.use('/api/v1/users', usersRoutes);

// handle all the other routes that are not used
app.all('*', (req, res, next) => {
    next(new AppError('Sorry but this route is not defined', 404));
});

app.use(globalErrorHandler);

module.exports = app;