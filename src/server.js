

const Express = require('express');
const http    = require('http');
const fs      = require('fs');
const path    = require('path');

const app     = new Express();
const server  = new http.Server(app);

app.use('/static', Express.static(path.join(__dirname, '../static')));

app.use((req, res, next) => {
    const originalUrl = req.originalUrl;

    if (!/^\/?static/.test(originalUrl)) {
        // Во всех остальных случаях возвращаем SPA приложение.
        fs.readFile(path.join(__dirname, '/index.html'), function(error, content) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        });
    } else {
        next();
    }
});

server.listen(8000, (err) => {
    if (err) {
        console.error(err);
    }
    console.log('Server started: http://127.0.0.1:8000/ .');
});
