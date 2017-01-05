const config = require('./main');
var mailchimp = require('mailchimp-v3');

mailchimp.setApiKey(config.mailchimp_key);

// ========================
// Subscribe to main list
// ========================
exports.subscribeToNewsletter = function(email, firstname, lastname, businessname, userphone, zipcode ) {
    mailchimp.post('', {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname,
        BUSNAME: businessname,
        PHONENUM: userphone,
        ZIPCODE: zipcode
      }
  })
  .then(function(result) {
    console.log(email + ' has been subscribed to eMeents Media!');
  })
  .catch(function(err) {
    console.log('Mailchimp error.' + err);
  });
}
