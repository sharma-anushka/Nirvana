//variables
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Gratitude = require("./models/gratitudeModel");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/nirvana');
  }
  main().then(() => {
      console.log("connected to DB");
  }).catch((err) => {
      console.log(err);
  })

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

app.get("/gratitudeWall", async (req,res) => {
    const gratitudes = await Gratitude.find({});
    console.log(gratitudes);
    res.render("gratitudeWall.ejs", {gratitudes});
})

app.post("/gratitudeWall/:id/add", async (req, res) => {
    try {
        const { id } = req.params;
        console.dir(req.body);
        
        // Create a new gratitude entry
        let newGratitudeEntry = new Gratitude({
            gratitudeFor: req.body.gratitude.gratitudeFor,
            image: req.body.gratitude.image,
            category: req.body.gratitude.category
        });

        // Save the new gratitude entry
        await newGratitudeEntry.save();
        console.log(newGratitudeEntry);

        // Optionally, you can return a response with the new entry
        

    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding new gratitude entry.");
    }

    res.redirect("/gratitudeWall");
});

app.get("/moodTracker", (req,res) => {
    res.render("moodTracker.ejs");
})


//port-setup
app.listen(8080, () => {
    console.log("connected to server");
})