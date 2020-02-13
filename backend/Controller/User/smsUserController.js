const smsUser = (req, res) => {
var {pass}=req.body
var otp = `${pass} is your otp`

const accountSid = 'ACba3da62d5968c6d8a1d55a238890016e';
const authToken = '505550c48da7f2cad4daf3ca41b99da7';
const client = require('twilio')(accountSid, authToken);
client.messages
  .create({
    to: '+916381895223',
    from: '+12015618495',
     body: otp
   })
  .then(message => console.log(message.sid));
};

module.exports = {
    smsUser
  };
  