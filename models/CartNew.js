/*jshint esversion: 8*/

const mongoose = require('mongoose');

//const ItemsSchema = 


const CartSchema = mongoose.Schema({
    items: [{ 
        item: { type: String },
        size: {type: String}, 
        price: { type: Number }, 
        quantity: { type: Number },
        id: { type: String },
        lineTotalPrice: { type: Number },
        notes: { type: String}
    }],
    
    totalPrice: { type: Number },
    totalQty: { type: Number },
    userId: { type: String }
});

CartSchema.methods.initCart = function(oldCart, item) {
        
    console.log('Entering Cart initCart !!!-------------------------------');
    this.items = oldCart.items || {};
    //this.items = oldCart.items;
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;


    //this.add = function(item, id) {

    //console.log('Entring product add');
    console.log(`oldCart sent as parameter: ${JSON.stringify(oldCart)} + ${typeof(oldCart.items)}`);
    //console.log(`item sent as parameter: ${JSON.stringify(item)}`);  
    //console.log(`id sent as parameter: ${JSON.stringify(id)}`);  

    let storedItem;


    /* TOOK THIS OFF FOR LINE ITEM CONSOLIDATION
    if(typeof(oldCart.items) !== 'undefined') {
        console.log('Old cart has somethign in it -------');
        // check if the old cart contents already have this item ... if so increment quantity
        this.items.forEach(element => {
            // console.log(`element: ${element}`);
            if((element.id === item.id) && (element.size === item.size) && (element.notes === item.notes)) {
                //console.log(`Found a match : ${element.id}`);
                storedItem = element;
                storedItem.quantity += item.quantity;
                storedItem.lineTotalPrice = storedItem.quantity * item.price;
            }

        });
    }
    else {
        console.log('Old Cart has nothing in it ... ie coming in the for the first time in this session');
        // since threre is nothing in the cart, creae the first entry
        
    }
    */
    // console.log(`BEFORE.. storedItem: ${JSON.stringify(storedItem)}`); 

    //console.log(`before storedItem = ${storedItem}`);
    if (!storedItem) {
        //storedItem =  this.items['name1'] = {item: item.item, price: item.price, quantity: item.quantity};
        storedItem =  {item: item.item, price: item.price, quantity: item.quantity, notes: item.notes, size: item.size, id: item.id, lineTotalPrice: item.lineTotalPrice};
        storedItem.lineTotalPrice = storedItem.quantity * storedItem.price;
        console.log('Checking what it in slot #0');
        console.log(`storedItem.items[0] = ${storedItem.items}`);
        
        /*
        if(typeof(storedItem.items) === 'undefined') {
            this.items.pop(0);
        }
        */
       
        this.items.push(storedItem);
        //console.log(`DURING... storedItem: ${JSON.stringify(storedItem)}`); 

        //storedItem =  this.items[id] = {item: item.item, price: item.price, quantity: item.quantity};
    }

    //const savednCart = this.save();

    console.log(`AFTER... storedItem: ${JSON.stringify(storedItem)}`); 
    //console.log(`this.item[id]: ${JSON.stringify(this.item[id])}`);  
    //console.log(`afdter storedItem = ${storedItem}`);
    // checking prices
    //storedItem.
    
    //console.log(`this.totalQty: ${this.totalQty}`);
    //console.log(`this.totalPrice: ${this.totalPrice}`);


    //storedItem.quantity++;
   //storedItem.price = storedItem.item.price * storedItem.quantity;
    //this.totalPrice++;
    //this.totalPrice += storedItem.item.price;
    console.log('Exiting product add-----------------------------------');
    // }
};


// this function will consolidate dup item quantity in the cart ... NOT being called from the Consolidated routeine
CartSchema.methods.initCartConsolidate = function(oldCart, item) {
        
    console.log('Entering Cart initCart !!!-------------------------------');
    this.items = oldCart.items || {};
    //this.items = oldCart.items;
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;


    //this.add = function(item, id) {

    //console.log('Entring product add');
    console.log(`oldCart sent as parameter: ${JSON.stringify(oldCart)} + ${typeof(oldCart.items)}`);
    //console.log(`item sent as parameter: ${JSON.stringify(item)}`);  
    //console.log(`id sent as parameter: ${JSON.stringify(id)}`);  

    let storedItem;



    if(typeof(oldCart.items) !== 'undefined') {
        console.log('Old cart has somethign in it -------');
        // check if the old cart contents already have this item ... if so increment quantity
        this.items.forEach(element => {
            // console.log(`element: ${element}`);
            if((element.id === item.id) && (element.size === item.size) && (element.notes === item.notes)) {
                //console.log(`Found a match : ${element.id}`);
                storedItem = element;
                storedItem.quantity += item.quantity;
                storedItem.lineTotalPrice = storedItem.quantity * item.price;
            }

        });
    }
    else {
        console.log('Old Cart has nothing in it ... ie coming in the for the first time in this session');
        // since threre is nothing in the cart, creae the first entry
        
    }
    // console.log(`BEFORE.. storedItem: ${JSON.stringify(storedItem)}`); 

    //console.log(`before storedItem = ${storedItem}`);
    if (!storedItem) {
        //storedItem =  this.items['name1'] = {item: item.item, price: item.price, quantity: item.quantity};
        storedItem =  {item: item.item, price: item.price, quantity: item.quantity, notes: item.notes, size: item.size, id: item.id, lineTotalPrice: item.lineTotalPrice};
        storedItem.lineTotalPrice = storedItem.quantity * storedItem.price;
        console.log('Checking what it in slot #0');
        console.log(`storedItem.items[0] = ${storedItem.items}`);
        
        /*
        if(typeof(storedItem.items) === 'undefined') {
            this.items.pop(0);
        }
        */
       
        this.items.push(storedItem);
        //console.log(`DURING... storedItem: ${JSON.stringify(storedItem)}`); 

        //storedItem =  this.items[id] = {item: item.item, price: item.price, quantity: item.quantity};
    }

    //const savednCart = this.save();

    console.log(`AFTER... storedItem: ${JSON.stringify(storedItem)}`); 
    //console.log(`this.item[id]: ${JSON.stringify(this.item[id])}`);  
    //console.log(`afdter storedItem = ${storedItem}`);
    // checking prices
    //storedItem.
    
    //console.log(`this.totalQty: ${this.totalQty}`);
    //console.log(`this.totalPrice: ${this.totalPrice}`);


    //storedItem.quantity++;
   //storedItem.price = storedItem.item.price * storedItem.quantity;
    //this.totalPrice++;
    //this.totalPrice += storedItem.item.price;
    console.log('Exiting product add-----------------------------------');
    // }
};

CartSchema.methods.generateArray = function() {
    let arr = [];
    for (let id in this.items) {
        arr.push(this.items[id]);
    }
    return arr;
}

        
//        


module.exports = mongoose.model('nCart', CartSchema);
