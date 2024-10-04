//variables
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Gratitude = require("./models/gratitudeModel");
const Mood = require("./models/moodModel");
const Journal = require("./models/journal");


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

app.get("/moodTracker", async (req,res) => {
    const allMoods = await Mood.find({});
    console.log(allMoods);
    res.render("moodTracker.ejs", {allMoods});
})

app.post("/moodTracker/:id", async (req, res) => {
    console.dir(req.body);
    const { id } = req.params;

    // Convert the date string from the request body to a Date object
    const moodDate = new Date(req.body.date);

    // Check if the date conversion was successful
    if (isNaN(moodDate.getTime())) {
        console.error("Invalid date:", req.body.date);
        return res.status(400).send("Invalid date provided.");
    }

    // Log the moodDate to ensure it's a valid date object
    console.log("Mood Date:", moodDate);

    // Create a new mood entry
    let newMoodEntry = new Mood({
        mood: req.body.mood,
        intensity: req.body.intensity,
        note: req.body.note,
        date: moodDate,
    });

    try {
        // Save the new mood entry
        await newMoodEntry.save();
        console.log("Mood entry saved:", newMoodEntry);
        res.redirect("/moodTracker"); // Redirect to the mood tracker page
    } catch (error) {
        console.error("Error saving mood entry:", error);
        res.status(500).send("Error adding new mood entry.");
    }
});


app.get('/moodTracker/:date', async (req, res) => {
    const selectedDate = new Date(req.params.date); // Use req.params.date instead of req.body.date
    console.log("Selected Date:", selectedDate); // Log the selected date for debugging
    const allMoods = await Mood.find({});
    // Check if the date is valid
    if (isNaN(selectedDate.getTime())) {
        console.error("Invalid Date:", selectedDate);
        return res.status(400).send("Invalid date format");
    }

    // Query mood entries for the selected date
    const moodEntries = await Mood.find({
        date: {
            $gte: new Date(selectedDate.setUTCHours(0, 0, 0, 0)), // Start of the day
            $lt: new Date(selectedDate.setUTCHours(23, 59, 59, 999)), // End of the day
        }
    });

    console.log("Mood Entries:", moodEntries); // Log mood entries

    // Render the mood tracker page with mood entries for the selected date
    res.render('moodSelectedDate.ejs', { moodEntries, selectedDate, allMoods});
});


//journal

app.get("/journal", async (req,res) => {
    const allJournals = await Journal.find({});
    console.log(allJournals);
    res.render("journal.ejs", {allJournals});
})

app.post("/journal",async (req,res) => {
    console.dir(req.body);
    let newJournalEntry = new Journal({
        journalContent : req.body.journalContent,
        templateClass : req.body.templateClass
    })

    console.log(newJournalEntry);
    await newJournalEntry.save()
    res.redirect("/journal");
})




app.get("/toolKit/main", (req,res) => {
    res.render("toolKit/main.ejs");
})
app.get("/toolKit/anxiety", (req, res) => {
    res.render("toolKit/anxiety.ejs");
})
app.get("/toolKit/stress", (req, res) => {
    res.render("toolKit/stress.ejs");
})
app.get("/toolKit/depression", (req, res) => {
    res.render("toolKit/depression.ejs");
})
app.get("/toolKit/ptsd", (req, res) => {
    res.render("toolKit/ptsd.ejs");
})
app.get("/toolKit/bipolar", (req, res) => {
    res.render("toolKit/bipolar.ejs");
})

app.get("/emergency/main", (req,res) => {
    res.render("emergency/main.ejs");
})


//port-setup
app.listen(8080, () => {
    console.log("connected to server");
})