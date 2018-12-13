var express = require('express')
var app = express();
var path = require('path')
var bodyParser = require('body-parser')
var nodemailer = require("nodemailer");


var port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/index.html'))
})
app.post('/send-email',(req,res)=>{

    console.log(req.body)
    let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port: 25,
    auth:{
        user:"tedxnits2019@gmail.com",
        pass:"tedx@2019"
    },
    tls: {
        rejectUnauthorized: false
    }
})
let HelperOptions = {
    from: `"${req.body.firstname} ${req.body.lastname}" <${req.body.email}>`,
    to: 'tedxnits2019@gmail.com',
    subject: 'Contact form mail',
    text: `Email:${req.body.email} Info:  ${req.body.subject}`
  };
  
  
    transporter.sendMail(HelperOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("The message was sent!");
      console.log(info);
      res.redirect('/')
})
})
app.listen(port,()=>{
    console.log(`App is listening at port ${port}`)
})