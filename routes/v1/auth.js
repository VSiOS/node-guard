var express = require('express');
var router = express.Router();
var helper = require('../../utilities/helper');
var config = require('../../utilities/config');

var userModel = require('../../models/usermodel');
var roleModel = require('../../models/rolemodel');
var mongoose = require('mongoose');   



// router level middleware 
// checks for user name and password in each request

router.use(function (req, res, next) {
  //console.log('Request URL:', req.headers)
 
  let username = req.headers.username;
  let password = req.headers.password;

  
  if(helper.isEmpty(username) || helper.isEmpty(password) ){

      res.status(401).json({message : 'UNAUTHORIZED ACCESS'});
      return;

  }else{

    if(username == 'test' || password == 'test'){
      next();
    }
    else{
      res.status(401).json({message : 'UNAUTHORIZED ACCESS'});
      return;
    }
  }


}, function (req, res, next) {
  //console.log('Request Type:', req.method)
  next()
})





router.get('/', function(req, res, next) {

  res.json([

    'role1',
    'role2',
    'role3'
  ])
});

router.post('/', function(req, res, next) {

    //Get all parameters 
    var reqRolename           = req.body.name;
    var reqCapabilities       = req.body.capabilities;

    //validate parameters
    if(helper.isEmpty(reqRolename) || helper.isEmpty(reqCapabilities)){
      res.status(400).json({message:"missing parameters"});
      return;
    }


    //process parameters
    var reqCapabilities       = JSON.parse(reqCapabilities);





    // find a user in mongo with provided username
    roleModel.findOne({ 'name' :  reqRolename }, function(err, role) {

      // In case of any error, return using the done method
      if (err){
          res.status(400).send({message:'failed',error:err});
          return;
      }
      else if (role){
        res.status(400).json({message : 'already exist'});
        return;
      }
      else {

         var newRole          = new roleModel();
         newRole.name         = reqRolename;
         newRole.capabilities = reqCapabilities;

         // save the user
         newRole.save(function(err) {
              if (err){
                res.status(400).json({message : 'couldnt save role'+err});
              }
              else{
                res.status(200).json({message : 'save success', role: newRole});

              }
          
      });
      }            

    });
 });



router.put('/test', function(req, res, next) {

  res.json([

    'role0',
    'role2',
    'role3'
  ])
});

//TO BE REMOVED IN PRODUCTION
/***********FOR DEBUGGING ONLY *****************/
router.delete('/', function(req, res, next) {

 // if(config.debug  === true){

    var roleName = req.body.name;
    if(helper.isEmpty(roleName)){
      roleModel.remove({}, function (err) {
        if (err) return handleError(err);
        res.json({message:"removed all roles "}); 
      }); 
    }
    else{
      roleModel.remove({ name: roleName }, function (err) {
        if (err) return handleError(err);
        res.json({message:"removed role"}); 
      });
    }
 // }
 // else{
   // res.status(403).json({message : "UNAUTHORIZED"});
  //}
  

 
});
/***********FOR DEBUGGING ONLY *****************/


module.exports = router;