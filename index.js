const express = require("express");
const cors = require('cors');
var nodemailer = require('nodemailer');
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 9000;
const sgMail = require('@sendgrid/mail')

const app = express();

app.use(cors({
  origin:"https://version-1-0-1--majestic-kangaroo-39d8d2.netlify.app"
}));

app.use(bodyParser.json());

app.post('/contactMe', (req, res) => {
    console.log(req.body)
    const sendername = req.body.name
    const sendernumber = req.body.mobile
    const senderemail = req.body.email
    const sendermessage = req.body.message
    let from = `${senderemail}`

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'saebalam123@gmail.com',
          pass: 'lol'
        }
      });
      
      var mailOptions = {
        from: 'temp',
        to: 'saebalam123@gmail.com',
        subject: 'interview intimation',
        text: `New opportunity
        
            Name: ${sendername}
            Phone: ${sendernumber}
            Mail: ${senderemail}
            Msg: ${sendermessage}
            `
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send("Sent successfully")
        }
      });
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});