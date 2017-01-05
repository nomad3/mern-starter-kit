const config = require('./main');
const mailgun = require('mailgun-js')({ apiKey: config.mailgun_key,
domain: config.mailgun_domain });

// Create and export function to send emails through Mailgun API
exports.sendEmail = function(recipient, message) {
    const data = {
      from: '',
      to: recipient,
      subject: message.subject,
      text: message.text
    };

    mailgun.messages().send(data, function(error, body) {
    //  console.log(body);
    });
  }

// Create and export function to send emails through Mailgun API
exports.contactForm = function(sender, message) {
  const data = {
    from: sender,
    to: '',
    subject: 'A lead has asked to contact you from the eMeents Media Website',
    text: message
  };

  mailgun.messages().send(data, function(error, body) {
    //console.log(body);
  });
}
