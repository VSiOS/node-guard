var config = require('./config');
var nodemailer = require('nodemailer');
var path = require('path');
var templatesDir = path.resolve(__dirname, '..', 'views/mailer');
var emailTemplates = require('email-templates');


var EmailAddressRequiredError = new Error('email address required');


// create a defaultTransport using gmail and authentication that are
// stored in the `config.js` file.

var defaultTransport = nodemailer.createTransport(config.mailer.protocol,{
            host: config.mailer.server,
            port: config.mailer.port,
            auth: {
                user: config.mailer.auth.user,
                pass: config.mailer.auth.pass
            },
            tls: {rejectUnauthorized: false},
            debug:true
        });
    


exports.sendOne = function (templateName, locals, fn) {

      console.log('mailer -1 ------------');

  // make sure that we have an user email
  if (!locals.email) {
    return fn(EmailAddressRequiredError);
  }
  // make sure that we have a message
  if (!locals.subject) {
    return fn(EmailAddressRequiredError);
  }
  emailTemplates(templatesDir, function (err, template) {
    if (err) {
      console.log(err);
      return fn(err);
    }
    // Send a single email
    console.log('mailer0------------');

    template(templateName, locals, function (err, html, text) {

              console.log('mailer1------------');

      if (err) {
        console.log(err);
        return fn(err);
      }
      // if we are testing don't send out an email instead return
      // success and the html and txt strings for inspection
      if (process.env.NODE_ENV === 'test') {
        return fn(null, '250 2.0.0 OK 1350452502 s5sm19782310obo.10', html, text);
      }

      var transport = defaultTransport;
      transport.sendMail({

        from: config.mailer.defaultFromAddress,
        to: locals.email,
        subject: locals.subject,
        html: html,
        // generateTextFromHTML: true,
        //text: text
      }, function (err, responseStatus) {
        if (err) {
          console.log(err);

          return fn(err);
        }


        return fn(null, responseStatus.message, html, text);
      });
    });
  });
}