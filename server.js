const express = require("express");
const Pizza = require('./models/pizzaModel')
const db = require("./db")
const app = express();
app.use(express.json());

const pizzasRoute = require('./routes/pizzasRoute.js')
const userRoute = require('./routes/userRoute.js')
const ordersRoute = require('./routes/ordersRoute.js')


app.use('/api/pizzas/',pizzasRoute)
app.use('/api/user',userRoute)
app.use('/api/orders',ordersRoute)  
app.get("/", (req, res) => {
    res.send("Server Working on port " + port);
});



const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});




