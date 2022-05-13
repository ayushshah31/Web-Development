const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){

    var coin = req.body.crypto;
    var curr = req.body.fiat;

    request("https://apiv2.bitcoinaverage.com/indices/global/ticker/"+coin+curr,function(error,response,body){
    var data = JSON.parse(body);
    var price = data.last;
    console.log(price);
    res.send("<h1>1 Bitcoin = "+price+" USD</h1>");
    });
})

app.listen(1080,function(){
    console.log("Server is running on port 3000");
});