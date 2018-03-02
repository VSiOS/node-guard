/* File Name  : helper.js
 * Created By : Vishnu Satheesh
 * Date       : March 27 2016
 * Purpose    : Contains reusable helper methods
 */

var config = require('./config');

function logg(msg)
{
    if(config.log_enable==true) console.log(msg);
}

 function isEmpty(str)
{
	if(str!="" && str!=null && typeof(str)!==undefined && str.length!=0)
		return false;
	else
		return true;
}

function arrayContains(needle, arrhaystack)
{
    return (arrhaystack.indexOf(needle) > -1);
}

function returnJsonObjectAfterParse (jsonString){

    if (config.parse_enable) {

        try {
        var obj = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns 'null', and typeof null === "object", 
        // so we must check for that, too.
        if (obj && typeof obj === "object" && obj !== null) {
            return obj;
        }
    }
    catch (e) {
        console.log('Exception captured : '+e);
     }

    return false;

    }
    else{

        return jsonString;
    }
};


module.exports = {
    logg                        : logg,
	isEmpty						: isEmpty,
	returnJsonObjectAfterParse  : returnJsonObjectAfterParse,
    arrayContains               : arrayContains
	
};