const fs = require('fs');
const path = require('path');
const constants = require('../constants/constants');
const Error = require('../utilities/classes/Error');
const getUploadDirectoryPath = require('../utilities/helpers/getUploadDirectoryPath');

const sendFile = (req, res, next) => {
    // get the path of the upload directory to traverse over all files to find the requested file
    var downloadFilePath = getUploadDirectoryPath()
    var downloadResource = null

    req.ok = true;
    req.opcode = constants.opcode.DOWNLOAD
    req.fileFound = false;
    try
    {
        var fileNames = fs.readdirSync(downloadFilePath)
        
        for(let i = 0; i < fileNames.length; i++)
        {        
            var file = fileNames[i];
            var fileName = file.split(".")[0]

            // checking if the requested file exist or not
            if(fileName===req.query.meetingId)
            {
                req.fileFound = true
                req.downloadFilePath = downloadFilePath+path.sep+file

                break;
                
            }
        }
        console.log(req.fileFound)

        // throw error if file is not found
        if(req.fileFound === false)
        {
            throw new Error(constants.FILE_NOT_FOUND.Code, constants.FILE_NOT_FOUND.Message)
        }
        else
        {
            next()
        }
    }
    catch(err)
    {
        req.ok = false
        console.log(err)
        req.error = err

        next();
    }
}

module.exports = sendFile;