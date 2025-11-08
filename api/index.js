const express = require("express");
const cors = require('cors');
const Pizza = require('../models/pizzaModel')
const db = require("../db")

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const pizzasRoute = require('../routes/pizzasRoute.js')
const userRoute = require('../routes/userRoute.js')
const ordersRoute = require('../routes/ordersRoute.js')

app.use('/pizzas/', pizzasRoute)
app.use('/user', userRoute)
app.use('/orders', ordersRoute)

// Export for Vercel serverless functions
module.exports = app;

