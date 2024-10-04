const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const journalSchema = new Schema({
    journalContent : String,
    templateClass : {
        type : String,
        default : 'minimalist-template',
    }
});

const Journal = mongoose.model("Journal", journalSchema);
module.exports = Journal;