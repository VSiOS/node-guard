var mongoose 	= require('mongoose');
var helper      = require('../utilities/helper');


var ZoneSchema = new mongoose.Schema({
    name                    : { type: String, required: true, maxlength: 200 },
    description             : { type: String },
    site_name               : { type: String, required: true },
    importance              : { type: String, required:true, enum :['High', 'Medium', 'Low'] },
    device_id               : { type: String, required: true, maxlength: 200 },
    make                    : { type: String,  maxlength: 100},
    model                   : { type: String,  maxlength: 100},
    serial                  : { type: String,  maxlength: 100},
    questions               : [{type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    is_active               : { type: Boolean, default:true},
    logo_url                : { type: String, default:"NO LOGO AVAILABLE"},
    updated                 : { type: String, default: Date.now },
},
{ versionKey: false });



ZoneSchema.pre('save', function (next) {

    if(helper.isEmpty(this.description)){
        this.screenname = this.get('name'); 
    }
    next();

    
});

module.exports = mongoose.model('Zone', ZoneSchema);