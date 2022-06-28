
const express=require("express");
const bodyParser= require("body-parser");
var unirest = require("unirest");
var request= unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

const app=express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.render("index.ejs")
})

app.post('/sendmessage',async (req,res)=>{
    const OTP = Math.floor(1000 + Math.random() * 9000);
  request.headers({
    "authorization": "API_KEY"
  });
  
  request.form({
    sender_id: "FastSM", // Set your own "sender_id"
    message: req.body.message, // template id
    language: "english",
    route: "qt", // Transactional Route SMS
    variables: "{#AA#}",
    variables_values: OTP,
    numbers: req.body.number // Number present in GET request
  });
  
  request.end(function(res) {
    if (res.error) console.log("error at otp");

    console.log(res.body);
  });
 
})



app.listen(3000,()=>{
    console.log("server is running 3000 port")
})