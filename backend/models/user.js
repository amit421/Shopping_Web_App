const mongoose = require('mongoose');

let User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        pattern: "^[A-Za-z]*@gmail.com$",
        required: true,
        unique: true

    },
    password:{
      type: String,
      required: true  
    },
    usertype: {
    	type: String,
    	required: true
    }
});

module.exports = mongoose.model('User', User);