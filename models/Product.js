/*jshint esversion: 8*/

const mongoose = require('mongoose');
const { Double } = require('bson');
const { builtinModules } = require('module');



const ProductSchema = mongoose.Schema({
    product: { type: String, required: true },
    id: { type: String, required: true },
    
    price: {
        type: Number,
        required: true,
        default: 0
    },
    
    isSold: {
        type: Boolean,
        required: true,
        default: false
    },
    
    inStock: {
        type: Boolean,
        required: false,
        default: false
    },
    
    description: {
        type: String,
        required: true
    },

    image: {
        type: String
    },
    
    quantity: {
        type: Number, 
        required: false
    },
    
    createDate: {
        type: Date,
        default: Date.now
    },
    
    createUser: {
        type: String,
        required: false,
        default: "Akash"
    }
});


module.exports = mongoose.model('Product', ProductSchema);
