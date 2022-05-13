const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
app.set("view-engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/WikiDB");
const articleSchema = {
	title: String,
	content: String
};

const Article = mongoose.model("Article",articleSchema);

// *******************************REQUEST TARGETING ALL ARTICLES ************************************ 

app.route("/articles")
	.get(function(req,res){
			Article.find({},function(err,foundArticle){
				if(!err){
					res.send(foundArticle);
				} else {
					res.send(err);
				}
			});
	})
	.post(function(req,res){
		console.log(req.body.title);
		console.log(req.body.content);
		const newArticle = new Article({
			title: req.body.title,
			content: req.body.content
		});
		newArticle.save(function(err){
			if(!err){
				res.send("Successfully added data to the db");
			} else {
				res.send(err);
			}
		});
	})
	.delete(function(req,res){
		Article.deleteMany({},function(err){
			if(!err){
				res.send("Successfully deleted all the data");
			} else {
				res.send(err);
			}
		})
	});

// ******************************* REQUEST TARGETING SPECIFIC ************************************** 

app.route("/articles/:articleTitle")
	.get(function(req,res){
		Article.findOne({title: req.params.articleTitle},function(err,foundArticle){
			if(foundArticle){
				res.send(foundArticle);
			} else {
				res.send("No article found");
			}
		});
	})
	.put(function(req,res){
		console.log("PUT REQUST");
		console.log(req.params.articleTitle);
		Article.findOneAndUpdate(
			{title: req.params.articleTitle},
			{
				title: req.body.title,
				content: req.body.content,
			},
			{overwrite: true},
			function(err){
				if(!err){
					console.log("No ERROR");
					res.send("Successfully updated data");
				} else {
					console.log("ERROR");
					console.log(err);
					res.send(err);
				}
			}
		);
	})
	.patch(function(req,res){
		console.log("Patch REQUST");
		console.log(req.params.articleTitle);
		Article.findOneAndUpdate(
			{title: req.params.articleTitle},
			{$set: req.body},
			function(err){
				if(!err){
					console.log("No ERROR");
					res.send("Successfully updated(patch) data");
				} else {
					console.log("ERROR");
					console.log(err);
					res.send(err);
				}
			}
		);
	})
	.delete(function(req,res){
		Article.deleteOne({title: req.params.articleTitle},function(err){
			if(!err){
				res.send("data deleted");
			} else {
				console.log(err);
				res.send(err);
			}
		});
	});

app.listen(1080,function(){
	console.log("App started on port 1080");
});