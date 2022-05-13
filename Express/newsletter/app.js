const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    console.log(firstName,lastName,email);

    var options = {
        url: "https://us14.api.mailchimp.com",
        method: "POST",
        headers: {
            "Authorization" : "Ayush d8fcf667acd1898cc947dfa4f8b6fe77-us14",
        }
    }

    request(options,function(error,response,body){

    })
})

app.listen(1080,function(){
    console.log("server is running at port 1080");
});

// d8fcf667acd1898cc947dfa4f8b6fe77-us14