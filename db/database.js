//Akash Moorching
//Union App dev

/*jshint esversion: 8*/

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

/* //previous DB connect code (functional)
const uri = 'mongodb+srv://union:elmbrook@unionapp.obqmt.mongodb.net/uadb?retryWrites=true&w=majority';
const connectDB = async() => {
    await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log("Connected to mongoDB");
};
*/

const connectDB = async() => {
    await mongoose.connect(process.env.DB_CONNECT, 
        {useNewUrlParser: true, useUnifiedTopology: true},
        () => console.log("Connected to mongoDB")
    );
};

module.exports = connectDB;

/* was there before ... 
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://unionuser:elmbr00k@unionapp.obqmt.mongodb.net/unionapp?retryWrites=true&w=majority";
const client = new MongoClient(uri, 
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});


client.connect()
    .then(data => console.log("Mongo in business!!"))
    .catch(err => console.log(err));

module.exports = client;

*/