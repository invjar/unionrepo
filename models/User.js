/*jshint esversion: 8*/

const mongoose = require('mongoose');
const { boolean } = require('@hapi/joi');
//const { Double } = require('bson');
//const { builtinModules } = require('module');



const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 100,
        min: 4
    },
    
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 4
    },
    
    name: {
        type: String,
        required: false,
        max: 100,
        min: 1
    },

    creationDate: {
        type: Date,
        default: Date.now
    },

    profile: {
        type: String,
        default: "buyer"
    },

    accountStatus: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', UserSchema);
