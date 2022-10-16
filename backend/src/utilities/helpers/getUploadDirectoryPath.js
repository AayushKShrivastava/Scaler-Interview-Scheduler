// function to find the upload file path directory

const fs = require('fs')
const path = require('path')

const getUploadDirectoryPath = () => {

    var curdir = __dirname;

    var directoryStack = curdir.split(path.sep)

    directoryStack.pop()
    directoryStack.pop()
    directoryStack.pop()

    var uploadDirectoryPath = ""

    for(let i=0;i<directoryStack.length; i++)
        uploadDirectoryPath += directoryStack[i] + path.sep

    uploadDirectoryPath += "upload"
    console.log(uploadDirectoryPath)

    return uploadDirectoryPath

}

module.exports = getUploadDirectoryPath