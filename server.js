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
const isVercel = process.env.VERCEL === '1';
const fs = require('fs');

// Determine build path
let buildPath;
if (isVercel) {
    // On Vercel, the build files should be in the root build/ directory (copied by postbuild script)
    const possiblePaths = [
        path.join(__dirname, 'build'),  // Copied location (most likely)
        path.join(process.cwd(), 'build'),
        path.join(__dirname, 'client', 'build'),  // Original location
        path.join(process.cwd(), 'client', 'build')
    ];
    
    console.log('Looking for build files. __dirname:', __dirname);
    console.log('Looking for build files. process.cwd():', process.cwd());
    
    for (const possiblePath of possiblePaths) {
        try {
            console.log('Checking path:', possiblePath);
            if (fs.existsSync(possiblePath)) {
                console.log('  - Directory exists');
                if (fs.existsSync(path.join(possiblePath, 'index.html'))) {
                    buildPath = possiblePath;
                    console.log('✓ Found build directory at:', buildPath);
                    break;
                } else {
                    console.log('  - But index.html not found');
                }
            } else {
                console.log('  - Directory does not exist');
            }
        } catch (e) {
            console.log('  - Error checking path:', e.message);
        }
    }
    
    if (!buildPath) {
        buildPath = path.join(__dirname, 'build');
        console.log('⚠ Using default build path (may not exist):', buildPath);
    }
} else {
    buildPath = path.join(__dirname, 'client', 'build');
}

// Serve static files in production
if (process.env.NODE_ENV === 'production' || isVercel) {
    app.use(express.static(buildPath));
    
    // Catchall handler for React Router
    app.get('*', (req, res) => {
        const indexPath = path.join(buildPath, 'index.html');
        if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
        } else {
            res.status(404).json({ 
                message: 'React build not found',
                buildPath: buildPath,
                cwd: process.cwd(),
                __dirname: __dirname,
                vercel: isVercel
            });
        }
    });
} else {
    // Development mode
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




