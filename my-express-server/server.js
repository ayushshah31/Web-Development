const express = require("express");

const app = express();

app.get("/",function(req,res){
    res.send("<h1>Hello, World</h1>");
});

app.get("/contact",function(req,res){
    res.send("<h2>Contact me at shahayush934@gmail.com </h2>");
});

app.get("/about",function(req,res){
    res.send("<h1>This local server is hosted by Ayush Shah , a.k.a Me </h1>");
});

app.listen(1080,function(){
    console.log("Server started on port 1080");
});