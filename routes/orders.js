/*jshint esversion: 8*/

//console.log("entering psots.js");

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const connectDB = require('../db/database');
const Order = require('../models/Order');
const session = require('express-session');
const verify = require('./verifyToken');
const querystring = require('query-string');
const url = require('url');

//this part displays order history
router.get('/orderHistory/:userName', async (req, res, next) => {

    console.log("At least got till here ... eeiks");
    try {
        console.log(`username is ${req.params.userName}`);
        const getOrders = await Order.find({userName: req.params.userName});
        //const getOrders = await Order.find();
        console.log(`getOrders = ${getOrders}`);
        res.status(200).send(getOrders);
    } catch(err) {
        res.status(400).json({message: err });
    }
});

router.get('/orderStatus/:status', async (req, res, next) => {

    console.log("At least got till here in roderStaus ... eeiks");
    try {
        console.log(`status is ${req.params.status}`);
        const getOrders = await Order.find({status: req.params.status}); 
        //const getOrders = await Order.find();
        console.log(`getOrders = ${getOrders}`);
        res.status(200).send(getOrders);
    } catch(err) {
        res.status(400).json({message: err });
    }
});

router.patch('/orderStatusUpdate/:orderId/:status/:a/:b', async (req, res, next) => {
    try {
        console.log(`order Id is ${req.params.orderId}`);
        console.log(`status is ${req.params.status}`);
        console.log(`a is ${req.params.a}`);
        console.log(`b is ${req.params.b}`);
        const updatedOrder = await Order.updateOne(
            { _id: req.params.orderId },
            { $set: { status: req.body.status } }
    );
    console.log("order update = " + updatedOrder);
    res.status(200).json(updatedOrder);
    } catch (err) {
        res.json({message: err});
    }
});

//this part recieves post from browser to add new orders to cart
router.post('/order', async (req, res, next) => {
    console.log("post response for create order on console");
    //tests db connection
    const port = process.env.port || 3000;
    //res.send("action processed");

    console.log(`req.url = ${req.url}`);
    let reqUrl = req.url;
    const parsedUrl = url.parse(reqUrl);
    // console.log(`parsedUrl = ${parsedUrl}`);
    const queryUrl = querystring.parse(parsedUrl.query);

    const order = new Order({
        cartId: req.body.cartId,
        location: req.body.location,
        userId: queryUrl.id
    });

    console.log("order = " + order);

    try {
        const savedOrder = await order.save();
        console.log('Save was completed ... or was it a scam???');
            res.status(200).json(savedOrder);
    } catch(err) {
            res.status(400).json({message: err });
    }

    
});

//specific search
router.get('/:productId', async (req, res, next) => {
    try {
        console.log(req.params.productId);
        const prod = await Product.findById(req.params.productId);
        console.log("prod = " + prod);
        res.json(prod);
    } catch (err) {
        res.json({message: err});
    }
});

//DELETE product from catalog
router.delete('/:productId', async (req, res, next) => {
    try {
        console.log(req.params.productId);
        const removedProd = await Product.deleteOne({_id: req.params.productId});
        res.status(200).json(removedProd);
    } catch (err) {
        res.json({message: err});
    }
});

//UPDATE product on catalog
router.patch('/:productId', async (req, res, next) => {
    try {
        console.log(req.params.productId);
        const updatedProd = await Product.updateOne(
            { _id: req.params.productId },
            { $set: { product: req.body.product } }
    );
    console.log("prudct update = " + updatedProd);
    res.status(200).json(updatedProd);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;