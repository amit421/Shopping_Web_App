const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    vendor: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
    	type: Number,
    	required: true
    },
    order: [{
        customer:{
            type: String,
            required: true
        },
        quan:{
            type: Number,
            required: true            
        }
    }],
    review: [{
        customer:{
            type: Number,
            required: true
        },
        rating: {
            type: String
        }
    }],
    ratings: {
        type: Number,
        default: 0.0
    },
    status: {
        type: String,
        required: true,
        default: "waiting"
    }
});

module.exports = mongoose.model('Product', Product);