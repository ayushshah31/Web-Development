// App hosted: https://blooming-hamlet-51826.herokuapp.com/Ayush

const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();
// const items = ["Buy Food","Cook Food","Eat Food"];
const workList = [];

// Mongoose 
// {
    
mongoose.connect("mongodb+srv://ayushshah31:Ayushshah-123@cluster31.dajuw.mongodb.net/todoListDB");

const ItemSchema = {
    name: String
};

const ListSchema = {
    name: String,
    items: [ItemSchema]
}

const List = mongoose.model("list",ListSchema);

const Item = mongoose.model("Item",ItemSchema);
const item1 = new Item({
    name: "Welcome to your todolist!"
});

const item2 = new Item({
    name: "Hit the + button to add a new Item."
});

const item3 = new Item({
    name: "<-- Hit this to delete item."
});

const defaultItems = [item1,item2,item3];

// }


app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){

    Item.find({},function(err,items){
        if(items.length === 0){
            Item.insertMany(defaultItems,function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("success");
                }
            });
            res.redirect("/");
        }
        else{
            res.render('list', {listHeading: "Today" , newListItem: items});
        }
    })

});

app.post("/",function(req,res){

    const itemName = req.body.newItem;
    const listName = req.body.list;
    const newItem = Item({name: itemName});

    if( listName === "Today"){
        newItem.save();
        res.redirect("/");
    } else{
        List.findOne({name: listName},function(err,foundList){
            if(!err){
                foundList.items.push(newItem);
                foundList.save();
            }
        });
        res.redirect("/"+listName);
    }

});

app.post("/delete",function(req,res){
    const checkedItemId = req.body.checkbox;
    console.log(checkedItemId);
    const listName = req.body.listTitle;
    console.log(listName);
    if(listName === "Today"){
        Item.findByIdAndDelete(checkedItemId,function(err){
            if(err){
                console.log(err);
            } else{
                console.log("Deleted successfully");
            }
            res.redirect("/");
        });
    }
    else{
        List.findOneAndUpdate(
            {name: listName},
            {$pull: {items: {_id: checkedItemId}}},
            function(err,foundList){
                if(!err){
                    res.redirect("/"+listName);
                }
        });
    }
});

app.get("/:customListTitle",function(req,res){

    // if(lodash.lowerCase(post.title) === lodash.lowerCase(req.params.title))
    const customListTitle = _.capitalize(req.params.customListTitle);
    // console.log(customListTitle);
    List.findOne({name: customListTitle},function(err,results){
        if(!err){
            if(!results){
                console.log("new list created for "+customListTitle);
                const list = new List({
                    name: customListTitle,
                    items: defaultItems
                });
                list.save();
                res.redirect("/"+customListTitle);
            } else{
                res.render("list",{listHeading: results.name , newListItem: results.items});
            }
        }
    });
});

app.get("/about",function(req,res){
    res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 1080;
}

app.listen(port,function(){
    console.log("Server has started successfully");
});