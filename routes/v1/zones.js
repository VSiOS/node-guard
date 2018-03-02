
var express         = require('express');
var router          = express.Router();
var helper          = require('../../utilities/helper');
var config          = require('../../utilities/config');

var zoneModel       = require('../../models/zonemodel');
var mongoose        = require('mongoose');   
var ObjectId        = mongoose.Types.ObjectId;



// router level middleware 
// checks for user name and password in each request
router.use(function (req, res, next) {
    //console.log('Request URL:', req.headers)
   
    let username = req.headers.username;
    let password = req.headers.password;
  
    //TODO: check users access token and detaermine if he has permissions to perform client actions
    next();
     
  });
  



router.get('/:id', function(req, res, next) {

    //Get all parameters
  var reqZoneId             = req.params.id;


  //validate parameters
  if(helper.isEmpty(reqZoneId)){
        res.status(400).json({message:"missing parameters"});
        return;
  }

  var isValidZoneObjId       =  ObjectId.isValid(reqZoneId); //true
  if(!isValidZoneObjId ){
        res.status(400).json({message:'invalid zone Id'});
        return;
  }


  // find a site in mongo with provided site name
  zoneModel.findOne({ '_id' :  reqZoneId }, function(err, zone) {

    // In case of any error, return using the done method
    if (err){
            res.status(400).send({message:'failed',error:err});
            return;
    }
    else if (zone){
            res.status(200).json({error : '0', zone: zone});
    }
    else {

            res.status(400).json({message : 'no such site', error:'1'});
            return;
    }            

  });

});











router.post('/', function(req, res, next) {


    //Get all parameters 
    var reqZoneName           = req.body.name;
    var reqDescription        = req.body.description;
    var reqSiteName           = req.body.site_name;
    var reqImportance         = req.body.importance;
    var reqDeviceId           = req.body.device_id;
    var reqMake               = req.body.make;
    var reqLogoUrl            = req.body.logo_url;
    var reqModel              = req.body.model;
    var reqSerial             = req.body.serial;
    var reqQiestionsList      = req.body.questions_list;
    var reqIsActive           = req.body.is_active;



    try{
        //validate parameters
        if(helper.isEmpty(reqZoneName) || helper.isEmpty(reqImportance) || helper.isEmpty(reqDeviceId) 
        || helper.isEmpty(reqSiteName) || helper.isEmpty(reqQiestionsList)){
            res.status(400).json({message:"missing parameters"});
            return;
        }
    }
     catch(error){
         console.log('Exception : '+error);
         res.status(400).json({message:"error occurred", error : error});

     }
 
  

    var isValidAreaObjId       =  ObjectId.isValid(reqAreaId); //true
    var isValidSiteTypeObjId   =  ObjectId.isValid(reqSiteTypeId)
    if(!isValidAreaObjId  || !isValidSiteTypeObjId){
            res.status(400).json({message:'invalid area Id or site type Id'});
            return;
    }
 
    try{

      reqQiestionsList = JSON.parse(reqQiestionsList);
      if(reqQiestionsList && Object.keys(reqQiestionsList).length > 0){
    
        for ( var i = 0 ; i < Object.keys(reqQiestionsList).length ; ++i){
              var questionId        = reqQiestionsList[i];
              var isValidZoneId = ObjectId.isValid(questionId);
              if(!isValidQuestionId){
                    res.status(400).json({message:'invalid question Id',error:'1'});
                    return;
              }
        }
     }
     else{
        reqQiestionsList = [];
     }

    }
    catch(err){

      reqQiestionsList = [];
      console.log("Exception :"+ err);

    }
    


    // find a site in mongo with provided site name
    zoneModel.findOne({ 'name' :  reqZoneName }, function(err, zone) {

      // In case of any error, return using the done method
      if (err){
            res.status(400).send({message:'failed',error:err});
            return;
      }
      else if (zone){
            res.status(400).json({message : 'already exist', error:'1'});
            return;
      }
      else {

        
            var newZone              = new zoneModel();
            newZone.name             = reqZoneName;
            newZone.description      = reqDescription;
            newZone.site_name        = reqSiteName;        
            newZone.importance       = reqImportance;
            newZone.device_id        = reqDeviceId;        
            newZone.make             = reqMake;
            newZone.logo_url         = reqLogoUrl;
            newSite.model            = reqModel;
            newZone.serial           = reqSerial;
            newZone.is_active        = reqIsActive;
            newZone.questions        = reqQiestionsList;

         // save the newSite
         newZone.save(function(err) {
              if (err){
                    res.status(401).json({message : 'couldnt save zone ' +err});
              }
              else{
                    res.status(200).json({message : 'save success', zone: newZone});

              }
          
          });
      }            

    });
 });












router.put('/', function(req, res, next) {


      //Get all parameters
      var reqZoneId             = req.body.id; 
      var reqZoneName           = req.body.name;
      var reqDescription        = req.body.description;
      var reqSiteName           = req.body.site_name;
      var reqImportance         = req.body.importance;
      var reqDeviceId           = req.body.device_id;
      var reqMake               = req.body.make;
      var reqLogoUrl            = req.body.logo_url;
      var reqModel              = req.body.model;
      var reqSerial             = req.body.serial;
      var reqQiestionsList      = req.body.questions_list;
      var reqIsActive           = req.body.is_active;
  
  
  
      try{
          //validate parameters
          if(helper.isEmpty(reqZoneId) ||helper.isEmpty(reqZoneName) || helper.isEmpty(reqImportance) || helper.isEmpty(reqDeviceId) 
          || helper.isEmpty(reqSiteName) || helper.isEmpty(reqQiestionsList)){
              res.status(400).json({message:"missing parameters"});
              return;
          }
      }
       catch(error){
           console.log('Exception : '+error);
           res.status(400).json({message:"error occurred", error : error});
  
       }
   
    
  
      var isValidAreaObjId       =  ObjectId.isValid(reqAreaId); //true
      var isValidSiteTypeObjId   =  ObjectId.isValid(reqSiteTypeId)
      if(!isValidAreaObjId  || !isValidSiteTypeObjId){
              res.status(400).json({message:'invalid area Id or site type Id'});
              return;
      }
   
      try{
  
        reqQiestionsList = JSON.parse(reqQiestionsList);
        if(reqQiestionsList && Object.keys(reqQiestionsList).length > 0){
      
          for ( var i = 0 ; i < Object.keys(reqQiestionsList).length ; ++i){
                var questionId        = reqQiestionsList[i];
                var isValidZoneId = ObjectId.isValid(questionId);
                if(!isValidQuestionId){
                      res.status(400).json({message:'invalid question Id',error:'1'});
                      return;
                }
          }
       }
       else{
          reqQiestionsList = [];
       }
  
      }
      catch(err){
  
        reqQiestionsList = [];
        console.log("Exception :"+ err);
  
      }
      
  
  
      // find a site in mongo with provided site name
      zoneModel.findOne({ 'name' :  reqZoneName }, function(err, zone) {
  
        // In case of any error, return using the done method
        if (err){
              res.status(400).send({message:'failed',error:err});
              return;
        }
        else if (zone){
              res.status(400).json({message : 'already exist', error:'1'});
              return;
        }
        else {
  
          
              var newZone              = new zoneModel();
              newZone.name             = reqZoneName;
              newZone.description      = reqDescription;
              newZone.site_name        = reqSiteName;        
              newZone.importance       = reqImportance;
              newZone.device_id        = reqDeviceId;        
              newZone.make             = reqMake;
              newZone.logo_url         = reqLogoUrl;
              newSite.model            = reqModel;
              newZone.serial           = reqSerial;
              newZone.is_active        = reqIsActive;
              newZone.questions        = reqQiestionsList;
  
           // save the newSite
           newZone.save(function(err) {
                if (err){
                      res.status(401).json({message : 'couldnt save zone ' +err});
                }
                else{
                      res.status(200).json({message : 'save success', zone: newZone});
  
                }
            
            });
        }            
  
      });
});
  
  
  
  
  















module.exports = router;