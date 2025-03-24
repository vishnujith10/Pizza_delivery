const mongoose = require("mongoose");
require('dotenv').config(); // Ensure this line is at the top to load environment variables

const mongoURL = process.env.MONGO_URI || 'mongodb+srv://vishnu:vishnu10@cluster0.xulb2.mongodb.net/mern-pizza';

mongoose.connect(mongoURL)
    .then(() => {
        console.log('Mongo DB Connection Successful');
    })
    .catch((error) => {
        console.error('Mongo DB Connection Failed', error.message);
    });

module.exports = mongoose;


// mongoose.connect(mongoURL, {useUnifiedTopology:true, useNewUrlParser:true})