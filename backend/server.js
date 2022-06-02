const { createServer } = require('http');
const url = require('url');

const HOST = {
    HOSTNAME: 'localhost',
    PORT: 5000 || process.env.PORT,
    proprietor: 'patShot.App',
    hostMessage: function(){
        return `${this.proprietor}:: Host 'http://${this.HOSTNAME}:${this.PORT}' is running...`;
    }
}

//@desc       External file
const { addPicture, getAllPicture, publicPhoto } = require('./gearMd/gear'),
    { serverResponse } = require('./utils');


const server = createServer((req, res)=>{
    switch(req.url){
        case '/api/gallery/all':
            getAllPicture(req, res);
            break;

        case '/api/gallery':
            addPicture(req, res);
            break;
        case /\D\d+/.test(req.url) ? req.url : false:
            publicPhoto(res, req.url); 
            break;
        default:
            serverResponse(res, 404, {status: 404, message: 'Page Not Found'});
            break;
    }
})

server.listen(HOST.PORT, ()=>console.log(HOST.hostMessage()));