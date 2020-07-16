// IMPLEMENTED USING NODEMAILER::::

const nodemailer = require('nodemailer');

module.exports.forgotpass = (req,res) => {
    var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: 'abc@outlook.com', // apply original account info
          pass: '*****'  // apply original account Info
        }
      });
      
      var mailOptions = {
        from: 'adi01fal@outlook.com',
        to: 'adi07rak@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(':::', error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}