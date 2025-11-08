const fs = require('fs');
const path = require('path');

// Copy build files to root build directory for Vercel
const sourceDir = path.join(__dirname, 'client', 'build');
const destDir = path.join(__dirname, 'build');

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(
                path.join(src, childItemName),
                path.join(dest, childItemName)
            );
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

if (fs.existsSync(sourceDir)) {
    console.log('Copying build files from', sourceDir, 'to', destDir);
    // Remove destination if it exists
    if (fs.existsSync(destDir)) {
        fs.rmSync(destDir, { recursive: true, force: true });
    }
    copyRecursiveSync(sourceDir, destDir);
    console.log('Build files copied successfully to', destDir);
    
    // Verify the copy
    if (fs.existsSync(path.join(destDir, 'index.html'))) {
        console.log('✓ index.html found in build directory');
    } else {
        console.error('✗ index.html NOT found in build directory');
        process.exit(1);
    }
} else {
    console.error('Source build directory not found:', sourceDir);
    console.error('Current directory:', __dirname);
    console.error('Listing client directory:', fs.existsSync(path.join(__dirname, 'client')));
    process.exit(1);
}

