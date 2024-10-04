const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gratitudeSchema = new Schema({
    gratitudeFor : String,
    image: { type: String, default: null },
    category : String
});

const Gratitude = mongoose.model("Gratitude", gratitudeSchema);
module.exports = Gratitude;