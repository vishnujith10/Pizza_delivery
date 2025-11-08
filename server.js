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

// Serve static files from the React app
// Check if we're on Vercel (serverless) or local
const isVercel = process.env.VERCEL === '1';
const fs = require('fs');

// Try multiple possible paths for the build directory
let buildPath;
if (isVercel) {
    // On Vercel, try build directory first (copied by postbuild script), then client/build
    const possiblePaths = [
        path.join(__dirname, 'build'),  // Copied build files location
        path.join(__dirname, 'client', 'build'),  // Original location
        path.join(process.cwd(), 'build'),
        path.join(process.cwd(), 'client', 'build')
    ];
    
    // Find the first path that exists
    for (const possiblePath of possiblePaths) {
        try {
            if (fs.existsSync(possiblePath) && fs.existsSync(path.join(possiblePath, 'index.html'))) {
                buildPath = possiblePath;
                console.log('Found build directory at:', buildPath);
                break;
            }
        } catch (e) {
            // Continue to next path
        }
    }
    
    // Default to __dirname/build if none found
    if (!buildPath) {
        buildPath = path.join(__dirname, 'build');
        console.log('Using default build path:', buildPath);
    }
} else {
    // Local development: use client/build
    buildPath = path.join(__dirname, 'client', 'build');
}

if (process.env.NODE_ENV === 'production' || isVercel) {
    // Serve static files
    app.use(express.static(buildPath));
    
    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    app.get('*', (req, res) => {
        const fs = require('fs');
        const indexPath = path.join(buildPath, 'index.html');
        
        // Check if file exists before sending
        if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
        } else {
            res.status(404).json({ 
                message: 'React build not found. Please ensure the build completed successfully.',
                buildPath: buildPath,
                cwd: process.cwd(),
                __dirname: __dirname
            });
        }
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




