const fs = require('fs');

const Model = require('./../models/carModel');
const User = require('./../models/uerModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const helpFunctions = require('./../utils/helpFunctions');
const createOverview = require('./../utils/createOverview');


const getPage = fileName => {
    const file = fs.readFileSync(`${__dirname}/../views/html/${fileName}`, 'utf-8');
    if(!file) return next(new AppError('Page not found. Please try again', 404));
    return file;
}


const setProps = (prop, body) => {
    if(body[prop]) {
        return {
            validFrom: body[prop].validFrom,
            validTo: body[prop].validTo,
        }
    }else {
        return helpFunctions.set1970();
    }
}

exports.getAllCars = catchAsync(async(req, res, next) => {
    const cars = await Model.find();

    if(!cars) return next(new AppError('Couldn\'t get the cars. Please try again', 404));

    res.status(200).json({
        status: 'success',
        cars
    });
});

exports.createNewCar = catchAsync(async (req, res, next) => {
    const props = {};
    props.insurance = setProps('insurance', req.body);
    props.casco = setProps('casco', req.body);
    props.tehnicalInspection = setProps('tehnicalInspection', req.body);
    props.fireExtinguisher = setProps('fireExtinguisher', req.body);
    props.medicalKit = setProps('medicalKit', req.body);
    props.roadVignete = setProps('roadVignete', req.body);

    const newCar = {
        brand: req.body.brand,
        model: req.body.model,
        issuedYear: req.body.issuedYear,
        registerNo: req.body.registerNo,
        vin: req.body.vin,
        revisionAverageKm: req.body.revisionAverageKm,
        company: {},
        insurance: props.insurance,
        casco: props.casco,
        tehnicalInspection: props.tehnicalInspection,
        fireExtinguisher: props.fireExtinguisher,
        medicalKit: props.medicalKit,
        roadVignete: props.roadVignete
    };

    if(req.user.userRole === 'user') {
        newCar.owner = req.user._id;
    }else if(req.user.userRole === 'leader'){
        newCar.company.leader = req.user._id;
    }
    
    const createCar = await Model.create(newCar);
    
    if(!createCar) return next(new AppError('The new car was not created', 401));

    req.user.cars.push(createCar._id);
    await req.user.save({validateBeforeSave: false});
    
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

exports.findMyCar = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.user._id).populate('cars');
    if(!user) return next(new AppError('Ups, something went wrong. Please login and try again', 500));
    
    let car;
    user.cars.forEach( el => {
        if(el.registerNo === req.params.target) car = el;
    });

    let overviewBar = getPage('components/overviewBar.xml');
    overviewBar = createOverview.createOverviewBar(overviewBar, user.cars, car);
    
    const detailsList = createOverview.createOverviewDetails(car);

    res.status(200).json({
        status: 'success',
        overviewBar,
        detailsList
    });
});



exports.getCarPropPopup = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.user._id).populate('cars');
    if(!user) return next(new AppError('Ups, something went wrong. Please login and try again', 500));
    
    let car;
    user.cars.forEach( el => {
        if(el.registerNo === req.params.target) car = el;
    });

    const popup = createOverview.createPopup(car[req.params.prop], req.params.prop);
    
    res.status(200).json({
        status: 'success',
        popup
    })
});




exports.updateMyCar = catchAsync(async(req, res, next) => {
    console.log(req.body);
    if(req.body.company) delete req.body.company;
    if(req.body.owner) delete req.body.owner;

    const car = await Model.findOne({registerNo: req.params.target});

    if(!car) return next(new AppError('Falied to update car! Please try again', 400));

    car[req.params.prop] = req.body.data;

    await car.save({validateBeforeSave: false});

    res.status(200).json({
        status: 'success',
        message: 'Successfully updated data'
    })
});