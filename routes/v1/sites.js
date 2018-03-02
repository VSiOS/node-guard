
var express         = require('express');
var router          = express.Router();
var helper          = require('../../utilities/helper');
var config          = require('../../utilities/config');

var siteModel       = require('../../models/sitemodel');
var roleModel       = require('../../models/rolemodel');
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
    var reqSiteId             = req.params.id;


    //validate parameters
    if(helper.isEmpty(reqSiteId)){
          res.status(400).json({message:"missing parameters"});
          return;
    }

    var isValidSiteObjId       =  ObjectId.isValid(reqSiteId); //true
    if(!isValidSiteObjId ){
          res.status(400).json({message:'invalid site Id'});
          return;
    }


    // find a site in mongo with provided site name
    siteModel.findOne({ '_id' :  reqSiteId }, function(err, site) {

      // In case of any error, return using the done method
      if (err){
              res.status(400).send({message:'failed',error:err});
              return;
      }
      else if (site){
              res.status(200).json({error : '0', site: site});
      }
      else {

              res.status(400).json({message : 'no such site', error:'1'});
              return;
      }            

    });

});







router.get('/search/by', function(req, res, next) {

      //Get all parameters
    var reqQuery             = req.query.query;


    //validate parameters
    if(helper.isEmpty(reqQuery)){
          res.status(400).json({message:"missing parameters"});
          return;
    }



    // find a site in mongo with provided site name
    let regex = new RegExp(reqQuery,'i');
    siteModel.find({$or: [ {'name': regex},{'address': regex} ], $and:[{'is_active': true}]}, function(err, site) {

          // In case of any error, return using the done method
          if (err){
                  res.status(400).send({message:'failed',error:err});
                  return;
          }
          else if (site.length > 0){

                   res.status(200).json({error : '0', sites: site});

          }
          else {

                  res.status(400).json({message : 'no match found', error:'1'});
                  return;
          }            

        });

});










router.post('/', function(req, res, next) {

    //Get all parameters 
    var reqSiteName           = req.body.name;
    var reqAreaId             = req.body.area_id;
    var reqSiteTypeId         = req.body.sitetype_id;
    var reqClientName         = req.body.client_name;
    var reqAddress            = req.body.address;
    var reqNoOfZones          = req.body.no_of_zones;

    var reqLogoUrl            = req.body.logo_url;
    var reqEmailText          = req.body.email_text;
    var reqEnableTracking     = req.body.enable_tracking;
    var reqIsActive           = req.body.is_active;
    var reqZonesList          = req.body.zones_list

  
   

    var isValidAreaObjId       =  ObjectId.isValid(reqAreaId); //true
    var isValidSiteTypeObjId   =  ObjectId.isValid(reqSiteTypeId)
    if(!isValidAreaObjId  || !isValidSiteTypeObjId){
            res.status(400).json({message:'invalid area Id or site type Id'});
            return;
    }
 
    try{

      reqZonesList = JSON.parse(reqZonesList);
      if(reqZonesList && Object.keys(reqZonesList).length > 0){
    
        for ( var i = 0 ; i < Object.keys(reqZonesList).length ; ++i){
              var zoneId        = reqZonesList[i];
              var isValidZoneId = ObjectId.isValid(zoneId);
              if(!isValidZoneId){
                    res.status(400).json({message:'invalid zone Id',error:'1'});
                    return;
              }
        }
     }
     else{
         reqZonesList = [];
     }
  
    

    }
    catch(err){

      reqZonesList = [];
      console.log("Exception :"+ err);

    }
    


    //validate parameters
    if(helper.isEmpty(reqSiteName) || helper.isEmpty(reqAreaId) || helper.isEmpty(reqSiteTypeId) 
    || helper.isEmpty(reqClientName) || helper.isEmpty(reqAddress) || helper.isEmpty(reqNoOfZones)){
          res.status(400).json({message:"missing parameters"});
          return;
    }



    // find a site in mongo with provided site name
    siteModel.findOne({ 'name' :  reqSiteName }, function(err, site) {

      // In case of any error, return using the done method
      if (err){
            res.status(400).send({message:'failed',error:err});
            return;
      }
      else if (site){
            res.status(400).json({message : 'already exist', error:'1'});
            return;
      }
      else {
        
            var newSite              = new siteModel();
            newSite.name             = reqSiteName;
            newSite.area             = reqAreaId;
            newSite.site_type        = reqSiteTypeId;        
            newSite.client_name      = reqClientName;
            newSite.address          = reqAddress;        
            newSite.no_of_zones      = reqNoOfZones;
            newSite.logo_url         = reqLogoUrl;
            newSite.email_text       = reqEmailText;
            newSite.enable_tracking  = reqEnableTracking;
            newSite.is_active        = reqIsActive;
            newSite.zones            = reqZonesList;

         // save the newSite
         newSite.save(function(err) {
              if (err){
                    res.status(401).json({message : 'couldnt save site ' +err});
              }
              else{
                    res.status(200).json({message : 'save success', site: newSite});

              }
          
          });
      }            

    });
 });













 router.put('/', function(req, res, next) {

  //Get all parameters
  var reqSiteId             = req.body.id;
  var reqSiteName           = req.body.name;
  var reqAreaId             = req.body.area_id;
  var reqSiteTypeId         = req.body.sitetype_id;
  var reqClientName         = req.body.client_name;
  var reqAddress            = req.body.address;
  var reqNoOfZones          = req.body.no_of_zones;

  var reqLogoUrl            = req.body.logo_url;
  var reqEmailText          = req.body.email_text;
  var reqEnableTracking     = req.body.enable_tracking;
  var reqIsActive           = req.body.is_active;
  var reqZonesList          = req.body.zones_list


  //validate parameters
  if(helper.isEmpty(reqSiteId) || helper.isEmpty(reqSiteName) || helper.isEmpty(reqAreaId) || helper.isEmpty(reqSiteTypeId) 
  || helper.isEmpty(reqClientName) || helper.isEmpty(reqAddress) || helper.isEmpty(reqNoOfZones)){
    res.status(400).json({message:"missing parameters"});
     return;
  }
 
  var isValidSiteObjId       =  ObjectId.isValid(reqSiteId); //true
  var isValidAreaObjId       =  ObjectId.isValid(reqAreaId); //true
  var isValidSiteTypeObjId   =  ObjectId.isValid(reqSiteTypeId)
  if(!isValidAreaObjId  || !isValidSiteTypeObjId || !isValidSiteObjId){
      res.status(400).json({message:'invalid site Id, area Id or site type Id'});
      return;
  }

  try{

    reqZonesList = JSON.parse(reqZonesList);
    if(reqZonesList && Object.keys(reqZonesList).length > 0){
  
      for ( var i = 0 ; i < Object.keys(reqZonesList).length ; ++i){
            var zoneId        = reqZonesList[i];
            var isValidZoneId = ObjectId.isValid(zoneId);
            if(!isValidZoneId){
                  res.status(400).json({message:'invalid zone Id',error:'1'});
                  return;
            }
      }
   }
   else{
    reqZonesList = [];
  }

   if((Object.keys(reqZonesList).length > reqNoOfZones)){
        res.status(400).json({message:'number of zones mismatch',error:'1'});
        return;
   }

  }
  catch(err){

    reqZonesList = [];
    console.log("Exception :"+ err);

  }




  // find a site in mongo with provided site name
  siteModel.findOne({ '_id' :  reqSiteId }, function(err, site) {

    // In case of any error, return using the done method
    if (err){
        res.status(400).send({message:'failed',error:err});
        return;
    }
    else if (site){

      site.name             = reqSiteName;
      site.area             = reqAreaId;
      site.site_type        = reqSiteTypeId;        
      site.client_name      = reqClientName;
      site.address          = reqAddress;        
      site.no_of_zones      = reqNoOfZones;
      site.logo_url         = reqLogoUrl;
      site.email_text       = reqEmailText;
      site.enable_tracking  = reqEnableTracking;
      site.is_active        = reqIsActive;
      site.zones            = reqZonesList;

       // save the newSite
       site.save(function(err) {
            if (err){
              res.status(401).json({message : 'couldnt save site ' +err});
            }
            else{
              res.status(200).json({message : 'edit success', site: site});

            }
        
        });
    }
    else {

      res.status(400).json({message : 'no such site', error:'1'});
      return;
    }            

  });
});
















router.delete('/:id', function(req, res, next) {

      //Get all parameters
    var reqSiteId             = req.params.id;


    //validate parameters
    if(helper.isEmpty(reqSiteId)){
      res.status(400).json({message:"missing parameters"});
      return;
    }

    var isValidSiteObjId       =  ObjectId.isValid(reqSiteId); //true
    if(!isValidSiteObjId ){
        res.status(400).json({message:'invalid site Id'});
        return;
    }


    // find a site in mongo with provided site name
    siteModel.findOne({ '_id' :  reqSiteId }, function(err, site) {

      // In case of any error, return using the done method
      if (err){
          res.status(400).send({message:'failed',error:err});
          return;
      }
      else if (site){

        site.is_active        = false;
        // save the newSite
        site.save(function(err) {
              if (err){
                res.status(401).json({message : 'couldnt deactivate site ' +err});
              }
              else{
                res.status(200).json({message : 'site deactivated', site: site});

              }
          
          });
      }
      else {

        res.status(400).json({message : 'no such site', error:'1'});
        return;
      }            

    });

});
















module.exports = router;