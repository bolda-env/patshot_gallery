const fs = require('fs');
const path = require('path');


function serveFiles(req, res, url){
    switch(url){
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.createReadStream(path.dirname(__dirname) + url +'index.html').pipe(res);
            break;
    
        case '/beauty/theme.css':
            res.writeHead(200, {'Content-Type': 'text/css'});
            fs.createReadStream(path.dirname(__dirname) + url).pipe(res);
            break;
            
        case '/js/main.js':
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            fs.createReadStream(path.dirname(__dirname) + url).pipe(res);
            break;
        
    // @desc    All Image Home
        case '/gallery':
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.createReadStream(path.dirname(__dirname) + `${url}.html`).pipe(res);
            break;
        
        case '/js/gallery.js':
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            fs.createReadStream(path.dirname(__dirname) + url).pipe(res);
            break;
            
        default:
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({status: 404, message: 'File not found'}));
            break;
    }
}

module.exports = {
    serveFiles,
}