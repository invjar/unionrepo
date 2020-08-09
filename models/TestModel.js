/*jshint esversion: 8*/


//const mongoose = require('mongoose');
//const Product = require('./Product');


//var itemarray = [];
//var item = {};
//var itemname;
//var price;

//item.itemname="pizza";
//item.price="10";
//itemarray.push(item);
//item.itemname="icecream";
//item.price="20";
//itemarray.push(item);

//var cart={};
//var orderno;
//var cartlineitem;
//cart.orderno = "123";

//cart.cartlineitem = itemarray;

//console.log(cart);


class ItemSchema {
    constructor(id, qty, price) {
        this.arrayList = id;
        this.qty = qty;
        this.price = price;
    }
};

class CartSchema {
    constructor(qty, price) {
        this.itemArray = [];
        this.totalPrice = price;
        this.totalQuantity = price;
    }
};

let i1 = new ItemSchema(100, 10, 1);
let i2 = new ItemSchema(200, 20, 2);
let c = new CartSchema(1000, 2000);

let s = 'somename';

c.itemArray[1000] = i1;
c.itemArray[2000] = i2;
c.itemArray[s] = i1;

//console.log(JSON.stringify(i1));
//console.log(JSON.stringify(i2));
//console.log(JSON.stringify(c));
//c.itemArray.push(i1);
//c.itemArray.push(i2);
console.log('put: ' + JSON.stringify(c.itemArray[s]));
//let x = JSON.stringify(c);
//console.log(x);
//console.info(c.itemArray[asdlkjasdlkasdlkjasdkljaskljd]);






//module.exports = mongoose.model('NewCart', nCart);

