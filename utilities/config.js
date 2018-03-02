/* File Name  : config.js
 * Created By : Vishnu Satheesh
 * Date       : Feb 20 2017
 * Purpose    : Holds Configuration Settings for the App
 */

var dotenConfig = require('dotenv').config();

const config = {

    baseURL   : 'http://localhost:3000/',
    DB_URL    : process.env.DB_URL,
    DB_USER   : process.env.DB_USER,
    DB_PASS   : process.env.DB_PASS,


    PASSWORD_STRENGTH_CONST : '10',




    debug     : process.env.DEBUG,
    

    mailer: {
   				 auth: {
      			 		user: 'myapp@test.com',
      				 	pass: 'Type4bc',
    		    },
            server : 'myapp.ipage.com',
            port   : 587,
            protocol: 'SMTP',
            defaultFromAddress: 'MyApp <myapp@gmail.com>',
            mailBaseUrl : 'http://localhost:3000/'
   },

   //Code base controllers
   log_enable : true,
   parse_enable : true




};

module.exports = config;