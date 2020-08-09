//Akash Moorching
//Union App dev

/*jshint esversion: 8*/

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cp = require('cookie-parser');
const validator = require('express-validator');
const MongoStore = require('connect-mongo')(session);
//const sessionStorage = require('sessionstorage');

//const csrf = require('csurf'); //required for password protection
//const csrfProtection = csrf(); // starting csrf service

//use this to avoid cors error
const app = express();
app.use(cors());
app.use(bodyParser.json());

//app.use(validator());


//Import Routes
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
//const productRoute = require('./models/Product');
const connectDB = require('./db/database');
const ordersRoute = require('./routes/orders');
const authRoute = require('./routes/auth');
const nCart = require('./models/CartNew');
//const validations = require('./validations/validation');

app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/users', authRoute);

//require('./routes/auth');




//when resave: false, the session details are not always saved on the server wach time a request is made
//saveuninitialized is set to false ... means that session will not be stores even when it isn ot initialized

// set to protect routes .. telling express that all routes in the protected by csrf protection
cookieParser = cp();
app.use(cookieParser);

connectDB();
// max age ... in number of minutes ... currently 10 min
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: { maxAge: 10 * 60 * 1000}
})); 
// place to store the session ... ie store in mongoose
// Momorystore should not be used in ptoruction
// check session stores in express


//app.use(flash());
//passport.initialize();
//app.use(passport.session());

//app.use(express.static(path, join(__dirname, 'public')));

app.use(function(req, res, next) {
    //res.locals.login = req.isAuthenticated();
    res.locals.session - req.session;
});

//app.use('/users', usersRoute);
//app.use('/user', userRoute);



/******* uncomment to put back working DB connection code
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://union:elmbrook@unionapp.obqmt.mongodb.net/uadb?retryWrites=true&w=majority";
const client = new MongoClient(uri, 
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connectDB = async () => {
    await client.connect()
    .then(data => console.log("Mongo in business!!" + " " + this.db + " " + this.isConnected  + "  " + data.isConnected()))
    .catch(err => console.log(err));
};
************************************/

/* code b/w brackets was somewhat working before 
client.connect()
    .then(data => console.log("Mongo in business!!" + " " + this.db + " " + this.isConnected  + "  " + data.isConnected()))
    .catch(err => console.log(err));
*/


//module.exports = client;
/* */



//listener
app.listen(3000, () => console.log('Express server running'));
