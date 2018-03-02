'use strict';

var mongoose 	= require('mongoose');

var RoleSchema = new mongoose.Schema({
    name : { type : String,  required: true, enum: ['SuperAdmin', 'ClientAdmin', 'User',]},
    capabilities : { type : [String], required: true }
});

module.exports =   mongoose.model('Role', RoleSchema);
