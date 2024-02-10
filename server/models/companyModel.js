const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true
    }
}, {timestamps: true, bufferCommands: false});

const companyModel = mongoose.model('CompanyModel', companySchema);

module.exports = companyModel;