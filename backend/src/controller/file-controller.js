const constants = require("../constants/constants")

const fileController = (req, res) => {
    if(req.ok)
    {
        // handle file upload request
        if(req.opcode === constants.opcode.UPLOAD)
        {
            res.status(200).json({
                opcode : constants.opcode.UPLOAD,
                status : constants.SUCCESS,
                message : constants.message.FILE_UPLOAD_SUCCESS
            })
        }

        // handle file download request
        else if(req.opcode === constants.opcode.DOWNLOAD)
        {
            res.status(200).sendFile(req.downloadFilePath, (err) => {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log("File Sent")
                }
            })
        }
    }
    else
    {
        // respone in case of failure
        var responseData = {
            opcode : req.opcode,
            status : constants.FAILURE,
            error : {
                code : req.error.code,
                message : req.error.message
            }
        }
        if(req.error.code === constants.FILE_NOT_FOUND.Code)
        {
            console.log(responseData)
            res.status(404).json(responseData)
        }
        else
        {
            res.status(500).json(responseData)
        }
    }
}

module.exports = fileController