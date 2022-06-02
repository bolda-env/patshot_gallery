
const fs = require('fs'),
    path = require('path');


// @desc        CORS Server Response
function serverResponse(res, statusCode, resMessage = {}){    
    res.writeHead(statusCode, {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTION, PUT, DELETE',
        'Access-Control-Allow-Credentials': true,
        'Content-Type':'application/json',
    });
    res.end(JSON.stringify(resMessage))
}

// @desc        Write IMG file
function writeDataToFile(data, file_ext){    
    return new Promise((resolve, reject)=>{
        let img_name = `pat_img_${new Date().getTime()}${file_ext}`,
            filename = `${path.dirname(__filename)}/gallery_store/${img_name}`;

        fs.writeFile(filename, data, {encoding: 'base64'}, (err)=>{
            if(err) throw err;
            resolve(img_name);
        })
    })
}

module.exports = {
    serverResponse,
    writeDataToFile
}