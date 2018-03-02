var express       = require('express');
var router        = express.Router();
var helper        = require('../../utilities/helper');
var config        = require('../../utilities/config');

var areaModel     = require('../../models/areamodel');
var mongoose      = require('mongoose');   
var ObjectId      = mongoose.Types.ObjectId;






router.get('/', function(req, res, next) {

  // find a area in mongo with provided AreaName 
  areaModel.find({}, function(err, areas) {

    // In case of any error, return using the done method
    if (err){
        res.status(400).send({message:'failed',error:err});
        return;
    }
    else if (areas){
      res.status(200).json({message : 'success',areas:areas});
      return;
    }
    else {

      res.status(400).json({message : 'unable to return areas'});
      return;
    }            

  });
      
      
      
  
});

router.post('/', function(req, res, next) {

    //Get all parameters 
    var reqAreaname           = req.body.name;
    var reqIsActive           = req.body.is_active;

    //validate parameters
    if(helper.isEmpty(reqAreaname)){
         res.status(400).json({message:"missing parameters"});
         return;
    }

    // find a area in mongo with provided AreaName 
    areaModel.findOne({ 'name' :  reqAreaname }, function(err, area) {

      // In case of any error, return using the done method
      if (err){
          res.status(400).send({message:'failed',error:err});
          return;
      }
      else if (area){
        res.status(400).json({message : 'already exist'});
        return;
      }
      else {

         var newArea          = new areaModel();
         newArea.name         = reqAreaname;
         newArea.is_active    = reqIsActive;

         // save the user
         newArea.save(function(err) {
              if (err){
                res.status(400).json({message : 'couldnt save area', error : err});
              }
              else{
                res.status(200).json({message : 'save success', area: newArea});

              }
          
        });
      }            

    });
 });



 router.put('/', function(req, res, next) {

  //Get all parameters 
  var reqAreatId            = req.body.id;
  var reqAreaname           = req.body.name;
  var reqIsActive           = req.body.is_active;

  //validate parameters
  if(helper.isEmpty(reqAreaname)){
       res.status(400).json({message:"missing parameters"});
       return;
  }
  var isValidObjId    =  ObjectId.isValid(reqAreatId); //true
  if(!isValidObjId){
       res.status(400).json({message:'invalid id'});
       return;
  }  
  // find a area in mongo with provided AreaName 
  areaModel.findOne({ '_id' :  reqAreatId }, function(err, area) {

    // In case of any error, return using the done method
    if (err){
        res.status(400).send({message:'failed',error:err});
        return;
    }
    else if (area){

       area.name         = reqAreaname;
       area.is_active    = reqIsActive;

       // save the user
       area.save(function(err) {
            if (err){
              res.status(400).json({message : 'couldnt save area', error : err});
            }
            else{
              res.status(200).json({message : 'edit success', area: area});

            }
        
      });
     
    }
    else {

       res.status(400).json({message : 'no such area'});
       return;
    }            

  });
});

router.delete('/:id', function(req, res, next) {

  var reqAreaId       = req.params.id;
  
  var isValidObjId    =  ObjectId.isValid(reqAreaId); //true
  if(!isValidObjId){
    res.status(400).json({message:'invalid id'});
    return;
  }

  areaModel.findOne({'_id' : reqAreaId }, function(err, area) {

    // In case of any error, return using the done method
    if (err){
        res.status(400).json({message:'failed',error:err});
        return;
    }
    else if (area){
      area.is_active = false;
      area.save(function(err) {
        if (err){
          res.status(400).json({message : 'couldnt deactivate area', error : err});
        }
        else{
          res.status(200).json({message : "deactivate success", area: area});

        }
    
      });
    }
    else{
      res.status(200).json({message : 'no such area'});
      return;
    }
  });

});
  


module.exports = router;