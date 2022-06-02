const path = require('path'),
    fs = require('fs');

//@desc       External file
const { serverResponse, writeDataToFile } = require('../utils');
const Database = require('../acceleratorMd/accelerator');

// @desc      Create the Image and save to Database.
// @route     POST /api/gallery
function addPicture(req, res){
    if(req.method === 'POST'){
        let body = '';
        req.on('data', data=> body+= data);
    
        req.on('end', async ()=>{
            const data = JSON.parse(body);
            let ext = '';
            switch(data.type){
                case 'image/jpg':
                    ext = '.jpg';
                    break;
                case 'image/jpeg':
                    ext = '.jpg';
                    break;
                case 'image/png':
                    ext = '.png';
                    break;
            }
            
            // Write IMG File
            const img_name = await writeDataToFile(data.rawData.split(',')[1], ext);
    
            // Save to Database
            if(img_name != ''){
                const result = await Database.create(data.picture_name.toLowerCase(), img_name, data.type, data.size);
                console.log(result);
            }
        })
    }

    // CORS Server Response
    serverResponse(res, 200, {status: 'Successful Post!'});
}

// @desc      Get All Pictures
// @route     GET /api/gallery
async function getAllPicture(req, res){
    if(req.method === 'GET'){
        const pictures = await Database.findAllPicture();
        
        // CORS Server Response
        serverResponse(res, 200, pictures);
    }
    
}

// @desc      fs.write image
// @route     GET /Chars & Digits/
function publicPhoto(res, picture_name){
    fs.readdir(`${path.dirname(__dirname)}/gallery_store`, (err, files)=>{
        files.forEach(file => {
            if(file == picture_name.slice(1)){
                console.log(0)
            }else{
                fs.createReadStream(`${path.dirname(__dirname)}/gallery_store${picture_name}`).pipe(res);
            }
        })
    })
}

module.exports ={
    addPicture,
    getAllPicture,
    publicPhoto,
}