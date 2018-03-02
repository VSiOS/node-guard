
var mongoose 	= require('mongoose');



var ClientSchema = new mongoose.Schema({
    name                    : { type: String, required: true, maxlength: 100 },
    address                 : { type: String, required: true, maxlength: 500 },
    phone1                  : { type: String },
    phone2                  : { type: String },
    mobile                  : { type: String },
    emergency_contact       : { type: String, required: true },
    email_list              : { type: String,required: true},
    logo_url                : { type: String, default:"NO LOGO AVAILABLE"},
    is_active               : { type: Boolean, default:true},
    updated                 : { type: Date, default: Date.now },
    sites                   : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Site' }]
});

module.exports = mongoose.model('Client', ClientSchema);