const router = require('express').Router();
const File = require('../model/file');



router.get('/:uuid' ,async (req ,res) =>{
 const file = await File.findOne({uuid : req.params.uuid});

        if(!file){
            return res.render('download' , { error : 'link had been expire'});
        }
        const filePath = `${__dirname}/../${file.path}`
        res.download(filePath);


});

module.exports = router;