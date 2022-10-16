const fs = require('fs');
const constants = require('../constants/constants');
const Error = require('../utilities/classes/Error');

const saveFile = async(req, res, next) => {
    
    req.ok = true
    req.opcode = constants.opcode.UPLOAD
    try
    {
        var file = req.files.file
        var meetingId = req.body.meetingId;
        var tmp_path = req.files.file.path

        // setting file upload path
        var target_path = `upload/${meetingId}.zip`

        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on('end', ()=>{
            console.log(constants.message.FILE_UPLOAD_SUCCESS)
            next();
        });
        src.on('error', (error)=>{
            console.log(error)
            throw new Error(constants.SERVER_ERROR.Code, constants.SERVER_ERROR.Message)
        });
    }
    catch(err)
    {
        req.ok = false
        req.error = err
        next();
    }
}

module.exports = saveFile;