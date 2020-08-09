//used to describe the transactional cart

/*jshint esversion: 8*/

const mongoose = require('mongoose');
//const { Double } = require('bson');
//const { builtinModules } = require('module');



const OrderSchema = mongoose.Schema({
    userId: { type: String, /*required: true*/ },

    cartId: { type: String, /* copying reference of the orig cart ID */ },

    name: { type: String, /*required: true*/ },

    userEmail: { type: String, /*required: true*/ },
    
    items: [{ 
        item: { type: String }, 
        
        price: { type: Number }, 
        
        quantity: { type: Number },

        id: { type: String },

        lineTotalPrice: { type: Number } 
    }],
    
    totalPrice: { type: Number },

    totalQty: { type: Number },

    location: { type: String, required: true },

    status: { type: String, default: "pending" },
    
    createDate: { type: Date, default: Date.now }
    
});

module.exports = mongoose.model('Order', OrderSchema);
