// Cart storage
/*jshint esversion: 8*/

const mongoose = require('mongoose');




module.exports = function Cart(oldCart) {


    console.log('Yeaaaa .. Entering Cart constructur !!!');
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;


    this.add = function(item, id) {

        console.log('Entring product add');
        let storedItem = this.items[id];
        //console.log(`before storedItem = ${storedItem}`);
        if (!storedItem) {
            storedItem =  this.items[id] = {item: item, quantity: 0, price: 0};
        }
        //console.log(`afdter storedItem = ${storedItem}`);


        storedItem.quantity++;
        storedItem.price = storedItem.item.price * storedItem.quantity;
        this.totalPrice++;
        this.totalPrice += storedItem.item.price;
        console.log('Exiting product add');
    }

    this.generateArray = function() {
        let arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }
};