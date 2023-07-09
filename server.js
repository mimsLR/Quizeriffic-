const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require('fs');
const ejs = require("ejs");
let alert = require('alert');
'use strict';

mongoose.connect('mongodb://localhost/quizerifficDB');

const userSchema = new mongoose.Schema ({
    userName: String
});

const User = mongoose.model("User", userSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

    res.render("signin")
});

app.post("/start", async function (req,res) {
    const username = req.body.username 
    const category = req.body.category
    const difficulty = req.body.difficulty

    const user = new User ({
        userName: username
    });

    
    const exist = await User.findOne({userName: username})
    if (exist) {
        alert("Username already exists. Please try another one.")
        res.redirect('/')
    } else {
        user.save();
        res.render('index', {category: category, difficulty: difficulty})
    }
            
});


app.listen(3000, function() {
    console.log("Server is running on port 3000");
});