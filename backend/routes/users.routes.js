const userRoutes = require('express').Router();
let User = require('../models/user');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

userRoutes.use(cors())
process.env.SECRET_KEY = 'secret'


userRoutes.route('/all').post(function(req, res) {
    User.find(function(err, users) {
        if(err) {
            console.log(err)
        } else {
            res.json(users)
        }
    })
});


// Adding a new user
userRoutes.route('/register').post(function(req, res) {
    let user = new User(req.body);
        user.save()
            .then(user => {
                res.status(200).json({'User': 'User added successfully'});
            })
            .catch(err => {
                res.status(400).send('Error');
            });
});

// Login
userRoutes.route('/login').post(function(req, res){
    let user = req.body;
    User.find({email: `${req.body.email}`, password: `${req.body.password}`, usertype: `${req.body.usertype}`}, function(err, users) {
        return res.json(users);
    });
})

userRoutes.route('/').post(function(req,res) {
    User.find({_id: `${req.body._id}`}, function(err,user) {
        return res.json(user);
    });
})

module.exports = userRoutes;
