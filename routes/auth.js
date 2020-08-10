

/*jshint esversion: 8*/

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportL = require('passport-local');
const validator = require('express-validator');
const session = require('session');

//const sessionStorage = require('sessionstorage');

const connectDB = require('../db/database');
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validations/validation');
const verify = require('./verifyToken');
const products = require('./products');

const Product = require('../models/Product');
const Cart = require('../models/Cart'); 
const nCart = require('../models/CartNew');

//const csrf = require('csurf');
//const csrfProtection = csrf();
// set to protect routes .. telling express that all routes in the protected by csrf protection
//router.use(csrfProtection);


// tells passport how to store user in the session

/*
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local.singup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    User.findOne({'email': email}, function(err, user) {
        if(err) {
            return done(err);
        }
        if(user) {
            return done(null, false, {message: 'Email already in use'});
        }
        const newUser = new User();
        newUser.email = email;
        //const salt = bcrypt.genSalt(10);
        //const hashedPassword = bcrypt.hash(req.body.password, salt);
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result) {
            if(err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));

router.post('/passsignup', passport.authenticate('local.signup', {

    successRedirect: '/',
    failureRedirect: '/passsignup',
    failureFlash: true
}));
*/ 

//
router.post('/signup', async (req, res, next) => {
    console.log('in sign-up part of the code');

    //VALIDATE USER HERE
    //return only validation errors
    const {error} = registerValidation(req.body);
    if(error) 
        return res.status(400).json({"message": error.details[0].message});

    //checking if the email is already in the Database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) {
        return res.status(400).json({"message": 'email already exists'});
    }

    //password security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    /*
    console.log(`request body email ${req.body.email}`);
    console.log(`request body password ${req.body.password}`);
    console.log(`request body username ${req.body.username}`);
    */
    
    //Create a new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const newUser = await user.save();
        console.log('user info saved');
        //res.status(200).json(newUser);
        //use code below to send userId
        //res.status(200).send({ user: user._id, csrfToken: req.header.csrfToken() });
        res.status(200).send({ "user": user._id});
    } catch(err) {
            console.log("Error - dup email");
            res.status(400).json({"message" : err });
    }
});



//LOGIN SYSTEM
router.get('/login', async (req, res, next) => {

    //VALIDATE LOGIN HERE
    const {error} = loginValidation(req.body);
    if(error) 
        return res.status(400).send(error.details[0].message);

    //checking if the email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) 
        return res.status(400).json({"message": 'Invalid Email'});

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) 
        return res.status(400).json({"message": 'Invalid Password'});
    
    //Create and assign a token
    //secret token has been stored in the .env file
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('authToken', token).send({"token": token, "uid": user._id});
    //res.json({authToken: token}).send(token);

});

//ADD TO CART
/*
router.post('/add-to-cart/:id', async function(req, res, next) {
    console.log('entering add-to-cart');

    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
        if(err) {
            return res.status(400).send('product not found');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.status(200).send(cart);
    }); 

    //res.send('complete');
    console.log('exiting add-to-cart');
});
*/

router.post('/addCart', async function(req, res, next) {
    console.log('entering addCart');

    console.log(`session = ${req.session}`);
    const productId = req.body.id;
    console.log(`productId = ${productId}`);


    Product.findOne( { '_id': productId }, function(err, product) {
        if(err) {
            return res.status(400).send('product not found');
        }

        console.log('Product found !!!');
        //console.log('req.session.id !!!' + req.session._id);
        console.log('req.headers.cart: ' + req.headers.cart);

        let cart;
        if(session.cart == null)
            cart = new Cart({});
        else
            cart = new Cart(session.cart);


        console.log('new cart created found !!!');


        cart.add(product, product._id);

        session.cart = cart;
        console.log(`session.cart = ${session.cart}`);
        
        //sessionStorage.setItem("cart": cart);
    
        //cart.save();

        //req.header.cart = cart;
        //console.log(req.header.cart);
        res.status(200).send(session.cart);
    });


    //res.send('complete');
    console.log('exiting add-to-cart');
});

router.get('/shopping-cart', function(req, res, next) {
    if(!session.cart) {
        return res.send('it is null');
    }
    let cart = new Cart(session.cart);
    res.status(200).send(cart, {products: cart.generateArray(), totalPrice: cart.totalPrice});
});


router.post('/add-to-newcart', async function(req, res, next) {
    console.log('entering add-to-newcart');

    //console.log(`session = ${req.session}`);
    const productId = req.body.id;
    const quantity = req.body.quantity;
    const price = req.body.price;
    //console.log(`productId = ${productId}`);
    //console.log(`quantity = ${quantity}`);
    //console.log(`price = ${price}`);



    Product.findOne( { '_id': productId }, function(err, product) {
        if(err) {
            return res.status(400).send('product not found');
        }

       // console.log('Product found !!!');
        //console.log('req.session.id !!!' + req.session._id);
        //console.log('req.headers.cart: ' + req.headers.cart);

        let cart;

        if(session.cart == null) {
            console.log('No existing cart session found .. creating a new cart session in mongo');
            ncart = new nCart({});
            //console.log(`productId = ${productId}`);
            ncart.initCart({}, {item: "some name", quantity: quantity, price: price, id: productId, lineTotalPrice: 0});
        }
        else {
            // ncart = new nCart(session.cart);
            ncart = new nCart();
            ncart.initCart(session.cart, {item:productId.product, quantity:quantity, price: price, id: productId, lineTotalPrice: 0});
            console.log('There is an existing cart session ... This should be an update of existing session');
        }

        console.log('new cart created found !!!');
        //console.log(`product.ItemName: ${product.product}`);

        //console.log(`session.cart: ${JSON.stringify(session.cart)}`);
        // console.log(`ncart: ${JSON.stringify(ncart)}`);
        //console.log(`ncart: ${ncart}`);
        if(!session.cart) {
            console.log('Creating a new session.cart ... MongoDB save');
            //ncart.items;
            //console.log(`ncart.items[0]: ${JSON.stringify(ncart.items[0])}`);
            //console.log(`ncart.items[1]: ${JSON.stringify(ncart.items[1])}`);

            const savednCart = ncart.save();
        } 
        else {
            //newValue = { $set: { items: ncart.items, totalQty: ncart.totalQty, totalPrice: ncart.totalPrice } };
            //newValue = { $set: { items: ncart.items, totalQty:2000, totalPrice: 4000 } };
            //console.log(`BEFORE MongoDB UPDATE .... newValue = ${JSON.stringify(newValue)}`);

            ncart.totalPrice = 0;
            ncart.totalQty = 0;
            ncart.items.forEach(element => {
                ncart.totalPrice += element.lineTotalPrice;
                console.log(`ncart.totalPrice: ${ncart.totalPrice}`);
                ncart.totalQty++;
            });
    
            console.log(`ncart : ${JSON.stringify(ncart)}`);
            //console.log(`session.cart._id: ${session.cart._id}`);
            //console.log(`ncart._id: ${ncart._id}`);


            //matchId = session.cart._id;
            //const savednCart = ncart.updateOne({_id: ObjectId(ncart._id)}, newValue);
            //const savednCart = ncart.updateOne({_id: session.cart._id}, newValue, {upsert: true});
            //let tempCart = nCart.find();
            //console.log(`nCart.find(): ${JSON.stringify(tempCart)}`);
            //const savednCart = nCart.findOneAndUpdate({_id: session.cart._id}, ncart, {upsert: true});
            nCart.deleteOne({"_id": session.cart._id}, (err, res) => {
                if(err) {
                    console.log(`err: ${err}`);
                }
            });
            //console.log(`tempCart: ${JSON.stringify(tempCart)}`);
            ncart.save();
        
            
            //const savednCart = ncart.updateOne({_id: ObjectId(ncart._id)}, newValue);
        }

        try {
            res.status(200).json(ncart);
            console.log('Save was completed ... or was it a scam???');            
        } catch(err) {
                res.status(400).json({message: err });
        }
   
        session.cart = ncart;
        //console.log(`session.cart = ${session.cart}`);
        
    });

    console.log('exiting add-to-cart');
});




module.exports = router;