// Initialization of MongoDB Databa
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

// @desc      Save to Database.
// @route     POST /api/gallery
function create(picture_name, img_name, type, size){
    return new Promise((resolve, reject)=>{
        MongoClient.connect(url, (err, dBase)=>{
            if(err) throw err;

            const db = dBase.db('gallery');
            db.collection('picture').insertOne({_id: (new Date().getTime()).toString(), picture_name, img_name, type, size}, (err, result)=>{
                if(err) throw err;
                resolve(`Successfully created!`);
            })
        })
    })
}

// @desc      Get all the pictures.
// @route     GET /api/gallery
function findAllPicture(){
    return new Promise((resolve, reject)=>{
        MongoClient.connect(url, (err, dBase)=>{
            if(err) throw err;

            const db = dBase.db('gallery');
            db.collection('picture').find({}).toArray((err, result)=>{
                try {
                    resolve(result);
                    dBase.close();
                } catch (err) {
                    reject(err);
                }
            })
        })
    })
}

module.exports = {
    create,
    findAllPicture,
}