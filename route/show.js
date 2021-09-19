const router = require('express').Router();
const File = require('../model/file');

router.get('/:uuid' ,async (req,res) => {

    try{
        const file = await File.findOne({ uuid : req.params.uuid })
        if(!file){
            return res.render('download' ,{err : 'link has been expired'});

        }
        return res.render('download' ,{
            uuid : file.uuid,
            fileName : file.filename,
            fileSize : file.size,
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        })
    }
catch(err){
    return res.render('download' ,{err : 'somethig went wrong '});
}
});


module.exports = router;