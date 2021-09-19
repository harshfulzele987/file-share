const router = require('express').Router();
const multer = require('multer');
const File = require('../model/file');
const {v4 :uuid4 } = require('uuid');
const path = require('path');
const { FILE } = require('dns');
const { runInNewContext } = require('vm');

//multer dependency code for extion of file name and unique name of each file .
let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/') ,
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
              cb(null, uniqueName)
    } ,
});

let upload = multer({
    storage,
    limits : {fileSize : 1000000 *100}
}).single('myfile');

router.post('/' ,(req ,res)=>{
    //sotre files
    upload(req,res, async (err)=>{
        
        //validate request
        if(!req.file){
            return res.json({error : "All  fields are required."});
        }

        if(err){
             return res.status(500).send({error : err.massage}) 
         }

    //store into database 
    const file = new File({

        filename : req.file.fieldname,
        uuid : uuid4(),
        path : req.file.path,
        size : req.file.size

    });
    
    const response = await file.save();
    return res.json({file : `${process.env.APP_BASE_URL}/files/${response.uuid}` });
});

// response link
});

router.post('/send' , async(req,res)=>{

    const {uuid ,emailTo , emailFrom } = req.body;
    // console.log(req.body);
    // return res.send({});


    //validate request 
    if(!uuid || !emailTo || !emailFrom){
        return res.status(422).send({error : 'all field are required'});

    }
    //get data from database
    const file = await File.findOne({uuid : uuid});
        
        if(file.sender){
            return res.status(422).send({error : 'email already sent'});
        }

        file.sender= emailFrom ;
        file.receiver = emailTo;

const response = await file.save();


//send email 
const sendMail = require('../services/emailservices');
sendMail({
    form: emailFrom,
    to : emailTo,
    subject : 'inshare file sharing',
    text : `${emailform} shared a file with you`,
    html : require('../services/emailTemplate')({
        emailFrom : emailFrom,
        downloadLink : `${this.process.env.APP_BASE_URL}/files/${file.uuid}`,
        size : parseInt(file.size/1000) + 'kb',
        expires : '24 hours'
    
    })
})

});

module.exports =router;











