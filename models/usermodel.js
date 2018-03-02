'use strict';

var mongoose 	= require('mongoose');



var UserSchema = new mongoose.Schema({
   
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, default: null },
    role : { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    contact : {type : mongoose.Schema.Types.ObjectId, ref:'Contact'}

});






module.exports = mongoose.model('User', UserSchema);


