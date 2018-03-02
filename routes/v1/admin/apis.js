//file : admin.js
//created by : Vishnu Satheesh
//Date : Feb 20 2018
//purpose : Contains routes for admin panel



var express         = require('express');
var mongoose        = require('mongoose');
var bcrypt          = require('bcrypt');
var router          = express.Router();
var constants       = require('../../../utilities/constants');
var helper          = require('../../../utilities/helper');
var config          = require('../../../utilities/config');


var userModel       = require('../../../models/usermodel');
var roleModel       = require('../../../models/rolemodel');
var contactModel    = require('../../../models/contactmodel');


// router level middleware 
// checks for Admins user name and Admin password in each request
router.use(function (req, res, next) {
    //console.log('Request URL:', req.headers)
   
    let username = req.headers.username;
    let password = req.headers.password;
  
    
    if(helper.isEmpty(username) || helper.isEmpty(password) ){
       
        res.status(401).json({message : 'UNAUTHORIZED ACCESS'});
        return;
    }
    else{
        if(username == 'Admin' || password == 'Admin'){
        
            next();
        }
        else{
            res.status(401).json({message : 'UNAUTHORIZED ACCESS'});
            return;
        }
    }
  }, function (req, res, next) {
        next()
  })
  
  

/**
 * Add Super Admin
 * Super Admin can add client admins and related users
 * 
 */

router.post('/addSuperAdmin', function(req, res, next) {
    
    //Get all parameters 
    var reqUsername           = req.body.username;
    var reqPassword           = req.body.password;
    var reqEmail              = req.body.email;


    var reqFirstName          = req.body.first_name;
    var reqLastName           = req.body.last_name;
    var reqPhone              = req.body.phone;
    var reqAddress1           = req.body.address1;
    var reqAddress2           = req.body.address2;
    var reqCity               = req.body.city;
    var reqZip                = req.body.zip


    //validate parameters
    if(helper.isEmpty(reqUsername) || helper.isEmpty(reqPassword)|| helper.isEmpty(reqEmail)
    || helper.isEmpty(reqFirstName)|| helper.isEmpty(reqLastName)|| helper.isEmpty(reqPhone)
    || helper.isEmpty(reqAddress1)|| helper.isEmpty(reqAddress2)|| helper.isEmpty(reqCity)|| helper.isEmpty(reqZip)){

        res.status(400).json({message:"missing parameters"});
        return;
    }
    roleModel.findOne({ 'name' : constants.ROLE_NAME.SUPER_ADMIN },function(err,role){

       
        if(role){

            userModel.findOne({'username':reqUsername}).populate({
                path: 'role',
                match: {
                  name: constants.ROLE_NAME.SUPER_ADMIN
                }})
                .populate('contact')
                .exec(function(err, users){
               
                if (err){
                           res.status(400).send({error:err});
                           return;
                }
                else if (users){
                           res.status(400).json({message: 'unable to add super admin'});
                           return;
                }
                else {
          
                
                  var newContact                = new contactModel();
                  newContact.first_name         = reqFirstName;
                  newContact.last_name          = reqLastName;
                  newContact.phone_number       = reqPhone;
                  newContact.address_line1      = reqAddress1;
                  newContact.address_line2      = reqAddress2;
                  newContact.city               = reqCity;
                  newContact.zip                = reqZip;
          
                  newContact.save(function(err){
          
                      if(err){
                          // save failed 
                          res.json("failed save contact:"+err);

                      }
                      else{
          

                          var newUser                  = new userModel();
                          newUser.username             = reqUsername;
                          newUser.password             = bcrypt.hashSync(reqPassword,parseInt(config.PASSWORD_STRENGTH_CONST,10));
                          newUser.email                = reqEmail;
                          newUser.contact              = newContact._id;
                          newUser.role                 = role._id;

                         
                          newUser.save(function(err){
                              if(err){
                                   res.status(200).json({error : '1',message : 'failed to save user'});
                              }
                              else{
                                  res.status(200).json({error : '0', message : 'success'});
                              }
                          })
          
                      }
                  });
          
                }
            });  

        }
        else{
            res.json("no such role");

        }
    });

  
 });


/**
 * Get details of SuperAdmin
 * To be used in dash board 
 * 
 */

router.get('/listSuperAdmins', function(req,res,next){

    roleModel.findOne({ 'name' : constants.ROLE_NAME.SUPER_ADMIN },function(err,role){
       
        if(role){

            userModel.find({}).populate({
                path: 'role',
                match: {
                  name: constants.ROLE_NAME.SUPER_ADMIN
                }})
               .populate('contact').
               exec(function(err, users){
                 
                if (err){
                    res.status(400).send({error:err});
                    return;
                }
                else if (users){
                    res.status(200).json({superAdmins:users});
                    return;
                }
                else {

                    res.status(400).json({message: 'error occured'});
                    return;
                }
            });
        }
   
    });

});







module.exports = router;
