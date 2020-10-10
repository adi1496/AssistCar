const Model = require('./../models/carModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllCars = catchAsync(async(req, res, next) => {
    const cars = await Model.find();

    if(!cars) return next(new AppError('Couldn\'t get the cars. Please try again', 404));

    res.status(200).json({
        status: 'success',
        cars
    });
});

exports.createNewCar = catchAsync(async (req, res, next) => {
    const newCar = {
        brand: req.body.brand,
        model: req.body.model,
        issuedYear: req.body.issuedYear,
        registerNo: req.body.registerNo,
        vin: req.body.vin,
        revisionAverageKm: req.body.revisionAverageKm
    };

    if(req.user.userRole === 'user') {
        newCar.owner = req.user._id;
    }else if(req.user.userRole === 'leader'){
        newCar.company.leader = req.user._id;
    }
    
    const createCar = await Model.create(newCar);
    
    if(!createCar) return next(new AppError('The new car was not created', 401));
    
    res.status(201).json({
        status: 'success',
        newCar
    });
});

exports.getOneCar = catchAsync(async(req, res, next) => {
    const car = await Model.findById(req.params.id);

    if(!car) return next(new AppError(`This doesn't exists. please try again with a valid argument`, 404));

    res.status(200).json({
        status: 'success',
        car
    });
});

exports.updateCar = catchAsync(async(req, res, next) => {
    if(req.body.tires) delete req.body.tires;

    let car = await Model.findById(req.params.id);

    if(!car) return next(new AppError(`This doesn't exists. Please try again`, 404));

    if(req.body.revisions) {
        car.revisions.push(req.body.revisions);
        delete req.body.revisions;
        for(let propertyCar in car) {
            for(let propertyBody in req.body){
                if(propertyCar === propertyBody) {
                    car[propertyCar] = req.body[propertyBody];
                }
            }
        }
    }else{
        for(let propertyCar in car) {
            for(let propertyBody in req.body){
                if(propertyCar === propertyBody) {
                    car[propertyCar] = req.body[propertyBody];
                }
            }
        }
    }
    await car.save();

    res.status(200).json({
        status: 'success',
        car
    });
});

exports.deleteCar = catchAsync(async(req, res, next) => {
    const car = await Model.findByIdAndDelete(req.params.id);

    if(!car) next(new AppError(`This doesn't exists. Please try again`, 404)); //there is no document with this id (node doesn't know that)

    res.status(204).json({
        status: 'success'
    })
});