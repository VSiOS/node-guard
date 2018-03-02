
var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var config = require('../../utilities/config');
var helper = require('../../utilities/helper');
var mongoose = require('mongoose');   
var ObjectId      = mongoose.Types.ObjectId;

var fileFolderPath   = 'uploads/' 
var uploads          = './uploads'




router.get('/file', function(req, res) {
      res.render('index')
  });
  
  var storage = multer.diskStorage({
      destination: function(req, file, callback) {
          callback(null,uploads)
      },
      filename: function(req, file, callback) {

        fileNameInServer= file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        callback(null, fileNameInServer)
      }
  });
  
  router.post('/file', function(req, res) {

      var upload = multer({
          storage: storage,
          fileFilter: function(req, file, callback) {
              console.log(file.mimetype);
              var ext = path.extname(file.originalname)
              if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
                  return callback(res.status(400).json({message:'upload failed',error:'only images are allowed'}), null)
              }
              callback(null, true)
          }
      }).single('logo');
      
      
      upload(req, res, function(err) {
          if(err){
            res.status(400).json({message:'upload failed',error:err});
            return;
          }
          else{
            var urlForFile = config.baseURL+fileFolderPath+fileNameInServer;
            res.status(200).json({message:'upload success',error:'0',url:urlForFile});
            return;
          }
      })
  });



  module.exports = router;