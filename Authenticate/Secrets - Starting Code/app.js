require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
// const encrypt = require('mongoose-encryption');
// UserSchema.plugin(encrypt,{secret: process.env.SECRET , encryptedFields: ['password']});
// const md5 = require('md5');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// ************* PASSPORT & SESSION **************
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
// GOOGLE LOGIN
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')

const app = express();

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/UserAuthDB');
const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleID: String,
    secret: String
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

const UserAuth_Secret = mongoose.model('User',UserSchema);

passport.use(UserAuth_Secret.createStrategy());

// passport.serializeUser(UserAuth_Secret.serializeUser());
// passport.deserializeUser(UserAuth_Secret.deserializeUser());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:1080/auth/google/secrets"
  },
    function(accessToken, refreshToken, profile, cb) {
        // console.log(profile);
        // console.log("profile_id: "+profile.id);
        const user = new UserAuth_Secret({
            googleID: profile.id
        });
        UserAuth_Secret.findOne({googleID: profile.id},function(err,foundUser){
            if(!err){
                console.log(foundUser);
                foundUser?console.log("FoundUser"):user.save();
                return cb(err, foundUser);
            }
        })
        // UserAuth_Secret.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     console.log("should save");
        //   return cb(err, user);
        // });
    })
);

app.get("/",function(req,res){
    res.render("home");
});

app.get('/auth/google',
  passport.authenticate("google", { scope: ["profile"] }));

app.get("/auth/google/secrets", 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
// Successful authentication, redirect to secrets page.
res.redirect("/secrets");
});

app.get("/login",function(req,res){
    res.render('login');
});

app.get("/register",function(req,res){
    res.render('register');
});

app.get("/secrets",function(req,res){
    UserAuth_Secret.find({secret: {$ne:null}},function(err,foundUser){
        if(err){
            console.log(err)
        } else {
            if(foundUser){
                console.log("FoundUser...");
                res.render("secrets",{userWithSecret: foundUser});
            }
        }
    })
});

app.get("/submit",function(req,res){
    if(req.isAuthenticated()){
        res.render('submit');
    } else {
        res.redirect('/login');
    }
});

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});

app.post("/register",function(req,res){

    UserAuth_Secret.register({username: req.body.username},req.body.password,function(err,user){
        if(err){
            console.log("error: "+err);
            res.redirect('/register');
        } else {
            passport.authenticate("local")(req,res,function(){
                res.redirect('/secrets');
            });
        }
    });
});

app.post("/login",function(req,res){
    const user = new UserAuth_Secret({
        email: req.body.username,
        password: req.body.password
    });
    req.login(user, function(err) {
        if(err){
            console.log("Error");
            console.log(err);
        } else {
            passport.authenticate("local")(req,res,function(){
                res.redirect('/secrets');
            });
        }
    });
});

app.post("/submit",function(req,res){
    const userSecret = req.body.secret;
    console.log(req.user._id);
    UserAuth_Secret.findById(req.user._id,function(err,foundUser){
        if(err){
            console.log(err);
        } else {
            if(foundUser){
                console.log("USER");
                foundUser.secret = userSecret;
                console.log("FOUND USER: "+foundUser);
                console.log(foundUser.secret);
                foundUser.save(function(err){
                    console.log("Secret should save");
                    res.redirect("/secrets");
                })
            }
        }
    })
});

// app.post("/register",function(req,res){
//     bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
//         const newUser = new UserAuth_Secret({
//             email : req.body.username,
//             password : hash
//         });
//         newUser.save(function(err){
//             if(err){
//                 console.log(err);
//             } else{
//                 res.render('secrets');
//             }
//         });
//     });
// });

// app.post("/login",function(req,res){
//     const email = req.body.username;
//     const password = req.body.password;
//     UserAuth_Secret.findOne({email:email},function(err,foundUser){
//         if(!err){
//             bcrypt.compare(password, foundUser.password, function(err, result) {
//                 if(result===true){
//                     res.render('secrets');
//                 } else{
//                     console.log("Error");
//                     console.log(err);
//                 }
//             });
//         } else{
//             console.log("Error");
//             console.log(err);
//         }
//     });
// });

app.listen(1080,function(){
    console.log("Secret-App started on port 1080.\n")
});