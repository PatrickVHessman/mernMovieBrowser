const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    fullplot: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model("Movie", movieSchema, "movies")