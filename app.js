//variables
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

//app.set
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//app.use
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.engine("ejs", ejsMate);



//routes-app.get
app.get("/", (req,res) => {
    res.render("home.ejs");
})

app.get("/gratitudeWall", (req,res) => {
    res.render("gratitudeWall.ejs");
})

app.get("/moodTracker", (req,res) => {
    res.render("moodTracker.ejs");
})


//port-setup
app.listen(8080, () => {
    console.log("connected to server");
})