var express       = require('express');
var router        = express.Router();
var helper        = require('../../utilities/helper');
var config        = require('../../utilities/config');

var clientModel   = require('../../models/clientmodel');
var mongoose      = require('mongoose');   
var ObjectId      = mongoose.Types.ObjectId;


// router level middleware 
// checks for user name and password in each request
router.use(function (req, res, next) {
    //console.log('Request URL:', req.headers)
   
    let username = req.headers.username;
    let password = req.headers.password;
  
    //TODO: check users access token and detaermine if he has permissions to perform client actions
    next();
     
  });
  
  




router.get('/search', function(req, res, next) {

      var reqSearch    = req.query.query;
      // find a client in mongo with provided username
      let regex = new RegExp(reqSearch,'i');
      clientModel.find({$or: [
        {'name': regex},
        {'address': regex},
      ] }, function(err, clients) {


        // In case of any error, return using the done method
        if (err){
            res.status(400).json({message:'failed',error:err});
            return;
        }
        else if (clients){
          res.status(200).json({clients : clients});
          return;
        }
      });

});
router.get('/:id', function(req, res, next) {

  var reqClientId     = req.params.id;
  
  var isValidObjId    =  ObjectId.isValid(reqClientId); //true
  
  if(!isValidObjId){
    res.status(400).json({message:'invalid id'});
    return;
  }

  clientModel.findOne({'_id' : reqClientId }, function(err, client) {

    // In case of any error, return using the done method
    if (err){
        res.status(400).json({message:'failed',error:err});
        return;
    }
    else if (client){
      res.status(200).json({client : client});
      return;
    }
    else{
      res.status(200).json({message : 'no such client'});
      return;
    }
  });

});
  

router.post('/', function(req, res, next) {

    //Get all parameters 
    var reqClientName           = req.body.name;
    var reqAddress              = req.body.address;
    var reqPhone1               = req.body.phone1;
    var reqPhone2               = req.body.phone2;
    var reqMobile               = req.body.mobile;
    var reqEmgContact           = req.body.emergency_contact;
    var reqEmailList            = req.body.email_list;
    var reqIsActive             = req.body.is_active;

    //validate parameters
    if(helper.isEmpty(reqClientName) || helper.isEmpty(reqAddress)|| helper.isEmpty(reqEmailList)){
          res.status(400).json({message:"missing parameters"});
          return;
    }


    // find a client in mongo with provided username
    clientModel.findOne({ 'name' :  reqClientName }, function(err, client) {

      // In case of any error, return using the done method
      if (err){
          res.status(400).json({message:'failed',error:err});
          return;
      }
      else if (client){
        res.status(400).json({message : 'already exist'});
        return;
      }
      else {

         var newClient                  = new clientModel();
         newClient.name                 = reqClientName;
         newClient.address              = reqAddress;
         newClient.phone1               = reqPhone1;
         newClient.phone2               = reqPhone2;
         newClient.email_list           = reqEmailList;
         newClient.emergency_contact    = reqEmgContact;
         newClient.mobile               = reqMobile;
         newClient.is_active            = reqIsActive;


            // save the client
            newClient.save(function(err) {
                  if (err){
                    res.status(400).json({message : 'couldnt save client'+err});
                  }
                  else{
                    res.status(200).json({message : 'save success', client: newClient});

                  }
              
            });
      }            

    });
});



router.put('/', function(req, res, next) {

  //Get all parameters 
  var reqClientId             = req.body.id;
  var reqClientName           = req.body.name;
  var reqAddress              = req.body.address;
  var reqPhone1               = req.body.phone1;
  var reqPhone2               = req.body.phone2;
  var reqMobile               = req.body.mobile;
  var reqEmgContact           = req.body.emergency_contact;
  var reqEmailList            = req.body.email_list;
  var reqIsActive             = req.body.is_active;

  //validate parameters
  if(helper.isEmpty(reqClientName) || helper.isEmpty(reqAddress)|| helper.isEmpty(reqEmailList)){
        res.status(400).json({message:"missing parameters"});
        return;
  }


  var isValidObjId    =  ObjectId.isValid(reqClientId); //true
  if(!isValidObjId){
    res.status(400).json({message:'invalid id'});
    return;
  }

  // find a client in mongo with provided username
  clientModel.findOne({ '_id' :  reqClientId }, function(err, client) {

    // In case of any error, return using the done method
    if (err){
        res.status(400).json({message:'failed',error:err});
        return;
    }
    else if (client){

      client.name                 = reqClientName;
      client.address              = reqAddress;
      client.phone1               = reqPhone1;
      client.phone2               = reqPhone2;
      client.email_list           = reqEmailList;
      client.emergency_contact    = reqEmgContact;
      client.mobile               = reqMobile;
      client.is_active            = reqIsActive;


         // save the client
         client.save(function(err) {
               if (err){
                 res.status(400).json({message : 'couldnt save client', error : err});
               }
               else{
                 res.status(200).json({message : "edit success", client: client});

               }
           
         });
      
    }
    else {

       res.status(400).json({message : 'no such client'});
       return;
    }            

  });
});




router.delete('/:id', function(req, res, next) {

  var reqClientId     = req.params.id;
  
  var isValidObjId    =  ObjectId.isValid(reqClientId); //true
  if(!isValidObjId){
    res.status(400).json({message:'invalid id'});
    return;
  }

  clientModel.findOne({'_id' : reqClientId }, function(err, client) {

    // In case of any error, return using the done method
    if (err){
        res.status(400).json({message:'failed',error:err});
        return;
    }
    else if (client){
      client.is_active = false;
      client.save(function(err) {
        if (err){
          res.status(400).json({message : 'couldnt deactivate client', error : err});
        }
        else{
          res.status(200).json({message : "deactivate success", client: client});

        }
    
      });
    }
    else{
      res.status(200).json({message : 'no such client'});
      return;
    }
  });

});
  


  module.exports = router;