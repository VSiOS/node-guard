
var mongoose 	= require('mongoose');



var SiteSchema = new mongoose.Schema({
    name                    : { type: String, required: true, maxlength: 100 },
    area                    : { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    site_type               : { type: mongoose.Schema.Types.ObjectId, ref: 'SiteType' },
    client_name             : { type: String, required:true },
    address                 : { type: String, required: true, maxlength: 500 },
    no_of_zones             : { type: Number, required:true},
    logo_url                : { type: String, default:"NO LOGO AVAILABLE"},
    email_text              : { type: String,  maxlength: 1000},
    enable_tracking         : { type: Boolean, default:false},
    is_active               : { type: Boolean, default:true},
    updated                 : { type: String, default: Date.now },
    zones                   : [{type: mongoose.Schema.Types.ObjectId, ref: 'Zone' }]
});

module.exports = mongoose.model('Site', SiteSchema);