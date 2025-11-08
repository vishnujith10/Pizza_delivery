const express = require("express");
const path = require("path");
const Pizza = require('./models/pizzaModel')
const db = require("./db")
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const pizzasRoute = require('./routes/pizzasRoute.js')
const userRoute = require('./routes/userRoute.js')
const ordersRoute = require('./routes/ordersRoute.js')

app.use('/api/pizzas/', pizzasRoute)
app.use('/api/user', userRoute)
app.use('/api/orders', ordersRoute)

const port = process.env.PORT || 5000;

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    
    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
} else {
    // Root route for development
    app.get("/", (req, res) => {
        res.send("Server Working on port " + port);
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// 404 handler (only in development, production handled by React router)
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res) => {
        res.status(404).json({ message: 'Route not found' });
    });
}

// Export for Vercel serverless functions
module.exports = app;

// Only listen when running locally (not on Vercel)
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}




