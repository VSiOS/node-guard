/* File Name  : constants.js
 * Created By : Vishnu Satheesh
 * Date       : Feb 3 2016
 * Purpose    : Holds global constants for the App
 */

 /* Strings Naming Convention
 *  METHOD_PURPOSE_TYPE
 * ex: SIGNUP_SUCESS_MSG
 */



module.exports = Object.freeze({

    ROLE_NAME   : {

        SUPER_ADMIN : 'SuperAdmin',
        CLIENT_ADMIN : 'ClientAdmin'
    },
    
    SIGNUP_SUCCESS_MSG: 'Registration successfull',

    EMAIL_VERIFICATION_SENT_MSG: 'A verification mail has been sent to your e-mail address. Please verify your address to proceed further',

    EMAIL_NOT_FOUND_MSG : 'No such email requested Registration',

    VERIFY_EMAIL_USER_SAVE_ERROR_MSG : 'Couldnt save user',

    VERIFY_EMAIL_SUCCESS_MSG : 'Email verification successfull. Please go to business connect portal to complete your Registration',

    LOGIN_SUCCESS_MSG: 'Login successfull',

    LOGIN_GENERAL_ERROR_MSG:  "Error occured in login",
    
    LOGIN_GENERAL_ERROR_MSG:  "Error occured in login",
    
    LOGIN_USR_NOT_FOUND_MSG:  "User Not Found with username",

    SIGNUP_GENERAL_ERROR_MSG: "Error in SignUp",

    SIGNUP_USR_EXISTS_MSG : 'User already exists with username:',

    SIGNUP_USER_SAVE_ERROR_MSG : "Couldn't save user",

    LOGIN_USR_NOT_SAVED_MSG  : "Couldn't save user",

    VERIFY_EMAIL_USER_SAVE_ERROR_MSG : "Couldn't save user",

    LOGIN_INVALID_USER_MSG : "Username/password is incorrect",

    EMAIL_PASSWORD_RESET_SENT_MSG : 'Email with a link to reset password is sent',
 
    RESET_PASS_GENERAL_ERROR_MSG : 'Error occured while restting password',

    RESETPASS_USR_NOT_SAVED_MSG : 'Couldnt save user while restting password',

    RESETPASS_SUCCESS_MSG : 'Password reset successfull',

    UNAUTHORIZED_USER_MSG : 'Not a valid user',

    INVALID_TOKEN_ERR_MSG : 'Not a valid access Token',

    USER_PERMISSION_ERR_MSG : 'User doesnt have permission to perform this operation',




    /****************USER MODULE********************/

    USER_GENERAL_ERROR_MSG  : "Error occured while fetching user",

    USER_USR_NOT_FOUND_MSG : "No such user",

    GET_USER_SUCCESS_MSG   : "User Found",

    GET_USER_COMPANY_ERR_MSG : "Couldnt fetch Company details",

    USER_ALREADY_EXISTS_COMPANY_ERR_MSG :"user already exists in company",



    /****************ORGANIZATION MODULE********************/

    CREATE_ORG_GENERAL_ERR_MSG : "Couldnot create an organization",

    CREATE_ORG_AUTH_ERR_MSG : "Create Organization :Authentication failed",

    CREATE_ORG_INVALID_TOKEN_ERR_MSG : "Create Organization: Invalid Token",

    COMPANY_ALREADY_EXISTS_ERR_MSG : "Comapnay with same business Id already exists",

    COMPANY_SAVE_ERROR_MSG : "Couldnt save comapny",

    COMPANY_SAVE_SUCCESS_MSG : "Comapnay Saved Successfully",

    NO_SUCH_COMPANY_ERR_MSG : "No Such comapny exists",

    CREATE_COMPANY_NAME_ERR_MSG : "Company name should be a valid string",

    CREATE_COMPANY_CAT_ERR_MSG : "Company should belong to atleast one category",

    CREATE_COMPANY_BIZID_ERR_MSG : "Company should have a valid business ID",

    CREATE_COMPANY_SAVE_ROLE_ERR_MSG : "error saving role",

    CREATE_COMPANY_SAVE_ROLE_TO_LIST_ERR_MSG :"Error pushing role to company roles list",

    CREATE_COMPANY_SAVE_ROLE_TO_USER_ERR_MSG : "Error saving role to user",

    CREATE_COMPANY_ADD_PAYMENT_MSG : "Error saving payment methods to comapany",



    /****************ROLES MODULE********************/

    ROLE_TYPE_COMPANY : 'Company',

    ROLE_TYPE_APPLICATION : 'Application',

    ROLE_TYPE_LOCATION : 'Location',


    //Company Level Roles Abilities
    USER : 'User',

    SUPER_ADMIN : 'Super-Admin',
    
    ADMIN : 'Admin',

    SUBSCRIPTION_ADMIN :'Subscriptions-Admin',

    PAYMENT_ADMIN : 'Payment-Admin',

    BUSINESS_ANALYZERS : 'Business-Analyzers',

    //Location Level Role Abilities  
    LOCATION_ADMIN : 'Location-Admin',

    LOCATION_SUBSCRIPTION_ADMIN :'Location-Subscriptions-Admin',

    LOCATION_PAYMENT_ADMIN : 'Location-Payment-Admin',

    LOCATION_BUSINESS_ANALYZERS : 'Location-Business-Analyzers',


    ABILITY_ADD_EDIT_ROLES : 'Add-Edit Roles',
    
    ABILITY_EDIT_COMPANY : 'Edit Company',
    
    ABILITY_ADD_EDIT_LOCATION : 'Set up Locations',
    
    ABILITY_SUBSCRIBE_APP : 'Subscribe Application',
    
    ABILITY_SETUP_PAYMENT : 'Payment Set up',
    
    ABILITY_VIEW_DASHBOARD : 'View Dashboard',



    SUPER_ADMIN_ADD_ERR_MSG : 'SUPER_ADMIN_ADD_ERR_MSG',



     /****************LOCATION MODULE********************/

     TYPE_LOCATION_STATUS_ACTIVE : '1',

     LOCATION_STATUS_ACTIVE : 'Active',

     TYPE_LOCATION_STATUS_SUSPENDED : '2',

     LOCATION_STATUS_SUSPENDED : 'Suspended',

     TYPE_LOCATION_STATUS_CLOSED  : '3',

     LOCATION_STATUS_CLOSED : 'Closed',

     CREATE_LOCATION_SUCCESS_MSG : 'Created location successfully',

     CREATE_LOCATION_SAVE_ERR_MSG : 'Couldnt create location',

     CREATE_LOC_INVALID_STS_ERR_MSG : 'Invalid location status',

     CREATE_LOC_INVALID_ADDR_ERR_MSG : 'Invalid address error',

     CREATE_LOC_INVALID_CATEGORY_ERR_MSG : 'Invalid category error',

     LOCATION_ALREADY_EXISTS_ERR_MSG : 'Location with same name already exists',

     CREATE_LOC_INVALID_NAME_ERR_MSG : 'Location name must be atleast three characters',

     LOCATION_DELETE_ERR_MSG : 'Couldnt delete location',

     LOCATION_DELETE_SUCCESS_MSG: 'Location deleted successfully',

     LOCATION_NOT_EXISTS_ERR_MSG :'Location doesnt exists',

     EDIT_LOCATION_SUCCESS_MSG : 'Location successfully edited',

     ADD_LOCATION_TO_COMPANY_ERR_MSG : 'Couldnt add location to company',


    /****************USER MODULE********************/

    ADD_USER_GENERAL_ERR_MSG : "Error occured while adding user"













});



