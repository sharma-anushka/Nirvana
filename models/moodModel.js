const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moodSchema = new Schema({
    mood: {
        type: String,
        enum: ['happy', 'sad', 'anxious', 'calm'], // List the mood options
        required: true
    },
    intensity : {
        type: Number,
        min : 1,
        max : 10,
    },
    note : String,
    date : {
        type : Date,
        required : true,
    }
});

const Mood = mongoose.model("Mood", moodSchema);
module.exports = Mood;