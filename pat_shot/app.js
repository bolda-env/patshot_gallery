const { createServer } = require('http');
const url = require('url');

//@desc       External file
const { serveFiles } = require('./Engine/serveFiles');

const HOST = {
    HOSTNAME: 'localhost',
    PORT: 3000 || process.env.PORT,
    proprietor: 'patShot.App',
    hostMessage: function(){
        return `${this.proprietor}:: Host 'http://${this.HOSTNAME}:${this.PORT}' is running...`;
    }
}

const app = createServer((req, res)=>{
    const pathURL = url.parse(req.url).pathname
    serveFiles(req, res, pathURL);
})

app.listen(HOST.PORT, ()=>console.log(HOST.hostMessage()));