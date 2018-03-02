/* File Name  : constants.js
 * Created By : Vishnu Satheesh
 * Date       : Feb 10 2016
 * Purpose    : Holds common error codes for the App
 */

 






module.exports = Object.freeze({


      /****************REGISTRATION MODULE : STARTS FROM 100 ********************/


      NO_ERROR			: '0',

      SIGNUP_GENERAL_ERR  : '100',
      
      EMAIL_NOT_FOUND_ERR  : '101',

      EMAIL_VERIFICATION_USER_EXISTS_ERR : '102',

      VERIFY_EMAIL_USER_SAVE_ERR : '103',

      SIGNUP_USR_EXISTS_ERR : '104',

      SIGNUP_USER_SAVE_ERR : '105',

      LOGIN_GENERAL_ERR : '106',

      LOGIN_INVALID_USER_ERR : '107',

      LOGIN_USR_NOT_SAVED_ERR : '108',

      RESET_PASS_GENERAL_ERR : '109',

      RESETPASS_USR_NOT_SAVED_ERR : '110',

      UNAUTHORIZED_USER_ERR : '111',

      INVALID_TOKEN_ERR   : '112',

      GET_USER_COMPANY_ERR : '113',

      USER_GENERAL_ERR : '114',

      USER_PERMISSION_ERR : '115',

      USER_USR_NOT_FOUND_ERR : '116',

      USER_ALREADY_EXISTS_COMPANY_ERR : '117',


      /************************* ORGANIZATION MODULE : STARTS FROM 200 *********************/

      CREATE_ORG_AUTH_ERR : '200',

      CREATE_ORG_GENERAL_ERR : '201',
      
      CREATE_ORG_INVALID_TOKEN_ERR : '202',

      COMPANY_ALREADY_EXISTS_ERR : '203',

      COMPANY_SAVE_ERR : '204',

      NO_SUCH_COMPANY_ERR : "205",

      CREATE_COMPANY_NAME_ERR : "206",

      CREATE_COMPANY_CAT_ERR : "207",

      CREATE_COMPANY_BIZID_ERR : "208",

      CREATE_COMPANY_ADD_PAYMENT_ERR : "209",

      CREATE_COMPANY_CATEGORY_ERR : "210",

      CREATE_COMPANY_SAVE_ROLE_ERR : "211",

      CREATE_COMPANY_SAVE_ROLE_TO_LIST_ERR : '212',

      CREATE_COMPANY_SAVE_ROLE_TO_USER_ERR : '213',

      CREATE_COMPANY_SAVE_ROLE_TO_LIST_ERR : '214',

      SUPER_ADMIN_ADD_ERR : '215',

      /************************* LOCATION MODULE : STARTS FROM 300 *********************/

      CREATE_LOCATION_SAVE_ERR : '300',

      CREATE_LOC_INVALID_ADDR_ERR_MSG : '301',

      CREATE_LOC_INVALID_STS_ERR : '302',

      CREATE_LOC_INVALID_CATEGORY_ERR : '303',

      LOCATION_ALREADY_EXISTS_ERR : '304',

      CREATE_LOC_INVALID_NAME_ERR : '305',

      LOCATION_DELETE_ERR : '306',

      LOCATION_NOT_EXISTS_ERR: '307',

      ADD_LOCATION_TO_COMPANY_ERR : '308',

      /************************* USER MODULE : STARTS FROM 400 *********************/

      ADD_USER_GENERAL_ERR : "400"




});