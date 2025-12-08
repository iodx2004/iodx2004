const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(`Request received: ${req.url}`);
    
    // Default to index.html if root is requested
    let filePath = req.url === '/' ? '/github-stats.html' : req.url;
    filePath = path.join(process.cwd(), filePath);

    // Set content type based on file extension
    const extname = path.extname(filePath).substring(1);
    let contentType = 'text/html';
    
    switch (extname) {
        case 'js':
            contentType = 'text/javascript';
            break;
        case 'css':
            contentType = 'text/css';
            break;
        case 'json':
            contentType = 'application/json';
            break;
        case 'png':
            contentType = 'image/png';
            break;
        case 'jpg':
            contentType = 'image/jpg';
            break;
        case 'gif':
            contentType = 'image/gif';
            break;
        case 'svg':
            contentType = 'image/svg+xml';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Serving files from: ${process.cwd()}`);
});