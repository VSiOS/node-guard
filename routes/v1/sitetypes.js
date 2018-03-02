var express       = require('express');
var router        = express.Router();
var helper        = require('../../utilities/helper');
var config        = require('../../utilities/config');

var siteTypeModel = require('../../models/sitetypemodel');
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
  



router.get('/', function(req, res, next) {

  // find a area in mongo with provided AreaName 
  siteTypeModel.find({}, function(err, siteTypes) {

    // In case of any error, return using the done method
    if (err){
        res.status(400).send({message:'failed',error:err});
        return;
    }
    else if (siteTypes){
      res.status(200).json({message : 'success',siteTypes:siteTypes});
      return;
    }
    else {

      res.status(400).json({message : 'unable to return site types'});
      return;
    }            

  });
      
      
      
  
});

router.post('/', function(req, res, next) {

    //Get all parameters 
    var reqSiteTypeName            = req.body.name;
    var reqIsActive                = req.body.is_active;
    

    //validate parameters
    if(helper.isEmpty(reqSiteTypeName)){
         res.status(400).json({message:"missing parameters"});
         return;
    }

    // find a area in mongo with provided AreaName 
    siteTypeModel.findOne({ 'name' :  reqSiteTypeName }, function(err, siteType) {

      // In case of any error, return using the done method
      if (err){
          res.status(400).send({message:'failed',error:err});
          return;
      }
      else if (siteType){
        res.status(400).json({message : 'already exist'});
        return;
      }
      else {

         var newSiteType          = new siteTypeModel();
         newSiteType.name         = reqSiteTypeName;
         newSiteType.is_active    = reqIsActive;

         // save the user
         newSiteType.save(function(err) {
              if (err){
                res.status(400).json({message : 'couldnt save site type', error : err});
              }
              else{
                res.status(200).json({message : 'save success', siteType: newSiteType});

              }
          
        });
      }            

    });
 });



 router.put('/', function(req, res, next) {

  //Get all parameters 
  var reqSiteTypeId              = req.body.id;
  var reqSiteTypeName            = req.body.name;
  var reqIsActive                = req.body.is_active;

  //validate parameters
  if(helper.isEmpty(reqSiteTypeName)){
       res.status(400).json({message:"missing parameters"});
       return;
  }
  var isValidObjId    =  ObjectId.isValid(reqSiteTypeId); //true
  if(!isValidObjId){
       res.status(400).json({message:'invalid id'});
       return;
  }  
  // find a area in mongo with provided AreaName 
  siteTypeModel.findOne({ '_id' :  reqSiteTypeId }, function(err, siteType) {

    // In case of any error, return using the done method
    if (err){
        res.status(400).send({message:'failed',error:err});
        return;
    }
    else if (siteType){

        siteType.name         = reqSiteTypeName;
        siteType.is_active    = reqIsActive;

       // save the user
       siteType.save(function(err) {
            if (err){
              res.status(400).json({message : 'couldnt save site type', error : err});
            }
            else{
              res.status(200).json({message : 'edit success', siteType: siteType});

            }
        
      });
     
    }
    else {

       res.status(400).json({message : 'no such site type'});
       return;
    }            

  });
});

router.delete('/:id', function(req, res, next) {

  var reqSiteTypeId      = req.body.id;
  var isValidObjId       =  ObjectId.isValid(reqSiteTypeId); //true
  
  if(!isValidObjId){
    res.status(400).json({message:'invalid id'});
    return;
  }

  siteTypeModel.findOne({'_id' : reqSiteTypeId }, function(err, siteType) {

    // In case of any error, return using the done method
    if (err){
        res.status(400).json({message:'failed',error:err});
        return;
    }
    else if (siteType){
        siteType.is_active = false;
        siteType.save(function(err) {
            if (err){
            res.status(400).json({message : 'couldnt deactivate site type', error : err});
            }
            else{
            res.status(200).json({message : "deactivate success", siteType: siteType});

            }
    
      });
    }
    else{
      res.status(200).json({message : 'no such site type'});
      return;
    }
  });

});
  


module.exports = router;