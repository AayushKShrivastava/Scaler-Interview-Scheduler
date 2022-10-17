const express = require('express')
const saveFile = require('../middleware/saveFile')
const sendFile = require('../middleware/sendFile')
const fileController = require('../controller/file-controller')

const router = express.Router()

router.post("/upload",saveFile,fileController)
router.get("/download", sendFile, fileController)

module.exports = router;