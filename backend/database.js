require('dotenv').config();
const mongoose = require('mongoose');
const connection = `mongodb+srv://${process.env.DB_CREDENTIALS}@cluster0.5rmcj.mongodb.net/sample_mflix?retryWrites=true&w=majority`;
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));