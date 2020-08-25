/*jshint esversion: 8*/

const mongoose = require('mongoose');
const { Double } = require('bson');
const { builtinModules } = require('module');



const CounterSchema = mongoose.Schema({
    cnt: { type: Number}
    
});


module.exports = mongoose.model('Counter', CounterSchema);
