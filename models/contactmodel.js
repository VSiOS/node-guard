'use strict';

var mongoose 	= require('mongoose');



var ContactSchema = new mongoose.Schema({
    first_name      : { type: String, required: true },
    last_name       : { type: String, required: true },
    phone_number    : { type: String, default: true },
    address_line1   : { type: String, required: true },
    address_line2   : { type: String, required: true },
    city            : {type : String,required: true},
    zip             : {type : String,required: true}


});

module.exports = mongoose.model('Contact', ContactSchema);