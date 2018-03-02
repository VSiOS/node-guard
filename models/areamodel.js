


var mongoose 	= require('mongoose');


var Areachema = new mongoose.Schema({
    name                :  { type: String, required: true, maxlength: 100,enum: ['New South Wales', 'Queensland', 'Victoria'] },
    is_active           :  { type: Boolean, default: true, required:true}
});


module.exports = mongoose.model('Area', Areachema);