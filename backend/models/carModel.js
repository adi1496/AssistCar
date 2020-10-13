const mongoose = require('mongoose');
const AppError = require('./../utils/appError');

const helpFunctions = require('./../utils/helpFunctions');

const carSchema = new mongoose.Schema({
    company: {
            leader: {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            },
    
            drivers: [
                {
                    type: mongoose.Schema.ObjectId,
                    ref: 'User'
                }
            ]
        
    },

    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },

    brand: {
        type: String,
        required: [true, 'The car must belong to a brand'],
        trim: true
    },

    model: {
        type: String,
        required: [true, 'The car must be a model of a brand'],
        trim: true
    },

    issuedYear: Number,

    registerNo: {
        type: String,
        required: [true, 'A car has a register number'],
        unique: true
    },

    vin: {
        type: String,
        unique: true,
        minlength: [16, 'VIN must be minimum 16 characters'],
        maxlength: [17, 'VIN must be maximum 16 characters']
    },

    revisionAverageKm: Number,

    revisions: [
        {
            revisionType: {
                type: String,
                default: 'Oil + filters'
            },
            date: Date,
            km: Number,
            description: String,
        }
    ],

    insurance: {
        validFrom: Date,
        validTo: Date,
        // paperPicture: String
    },

    casco: {
        validFrom: Date,
        validTo: Date,
        // paperPicture: String
    },

    tehnicalInspection: {
        validFrom: Date,
        validTo: Date,
        // paperPicture: String
    },

    fireExtinguisher: {
        validFrom: Date,
        validTo: Date,
    },

    medicalKit: {
        validFrom: Date,
        validTo: Date,
    },

    roadVignete: {
        validFrom: Date,
        validTo: Date,
    },

    tires: {
        tiresType: {
            type: String,
            enum: ['winter-tires', 'summer-tires']
        },
        dateStartSummer: Date,
        dateEndSummer: Date
    },

    documents: [
        {
            type: String,
        }
    ]
});

carSchema.pre(/^find/, function(next){
    this.select('-__v');

    next();
});

carSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'owner',
        select: '-__v -passwordChangedAt'
    });
    next();
});

carSchema.pre('save', function(next){
    this.brand = helpFunctions.firstLetterBig(this.brand);
    this.model = helpFunctions.firstLetterBig(this.model);
    this.registerNo = this.registerNo.toUpperCase();
    this.vin = this.vin.toUpperCase();

    next();
});


//set dates for tires time and tires type
carSchema.pre('save', function(next){
    if(this.isNew){
        if(this.tires) {
            const dates = helpFunctions.setDatesTiresSeason();
            this.tires.dateStartSummer = dates.date1;
            this.tires.dateEndSummer = dates.date2;
            this.tires.tiresType = dates.tiresType;
        }
    }

    next();
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;