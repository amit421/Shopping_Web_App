const prodRoutes = require('express').Router();
let Product = require('../models/product');

prodRoutes.route('/vendor').post(function(req, res) {
    Product.find( {vendor: `${req.body.vendor}`, status: `${req.body.status}`},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

// All Products
prodRoutes.route('/').post(function(req,res) {
    Product.find({status: `${req.body.status}`}, function(err,products) {
        if(err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

prodRoutes.route('/setdispatch').post(function(req,res) {
    Product.updateMany( {quantity: { $lte : `${req.body.q}` } } , {status: "placed" , quantity: 0}  , function(err,products) {
        if(err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});


// prodRoutes.route('/sort').post(function(req,res) {
//     Product.aggregate( { $sort : { price : 1 } }, function(err,products) {
//         if(err) {
//             console.log(err);
//         } else {
//             res.json(products);
//         }
//     });
// });

prodRoutes.route('/vendor/dispatched').post(function(req,res) {
    Product.updateOne( {status: 'placed'} , {status: "dispatched"}  , function(err,products) {
        if(err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});


// Specific Products
prodRoutes.route('/productbyname').post(function(req,res) {
    Product.find({name: `${req.body.name}`}, function(err,products) {
        if(err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});


// Products of a customer
prodRoutes.route('/customer_product').post(function(req,res) {
    Product.find({order: { $elemMatch: {customer: `${req.body.customer}`}} } , function(err,products) {
        if(err) {
            console.log(err);
        } else {
            res.json(products);
            console.log(products);
        }
    });
})


// Adding a new product
prodRoutes.route('/vendor/add_product').post(function(req, res) {
    const vendor = req.body.vendor;
    const name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;
    // const order = req.body.order;
    // const review = req.body.review;
    const status = req.body.status;

    const newprod = new Product({
    	vendor,
        name,
    	price,
        quantity,
        status,
    });
    newprod.save()
        .then(product => {
            res.json({status:'Product added successfully'});
        })
        .catch(err => {
            res.send('error ' + err);
        });
});




// Cancelling a Product
prodRoutes.route('/vendor/cancel').post((req,res) => {
    Product.updateOne({vendor:`${req.body.vendor}`, name: `${req.body.name}`, price: `${req.body.price}`, quantity:`${req.body.quantity}`,status: `${req.body.status}` }, { $set: {status: "Cancelled"} }, function(err,products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    })
});


// Updating a Product
prodRoutes.route('/update').post((req,res) => {
    Product.updateMany( { _id: `${req.body.iid}` }, { $push : { order: [ { customer: `${req.body.customer}`, quan: `${req.body.quantity}` } ] } , $inc: { quantity: -`${req.body.quantity}` } } , function(err,products) {
        if (err) {
            console.log(err);
        } else {
            res.json({status: 'Order Placed'});
        }
    })
});

module.exports = prodRoutes;
