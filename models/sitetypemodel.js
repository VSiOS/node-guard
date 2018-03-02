
var mongoose 	= require('mongoose');



var SiteTypeSchema = new mongoose.Schema({
    name                    :  { type: String, required: true, maxlength: 100, enum :['Corporate', 'Building', 'School','Industry','Hospital'] },
    is_active               :  { type: Boolean, default: true, required: true}
    
});

module.exports = mongoose.model('SiteType', SiteTypeSchema);