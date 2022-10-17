const express = require('express')
const participantsController = require('../controller/participants-controller')
const getAvailableSlots = require('../middleware/getAvailableSlots')
const getParticipantList = require('../middleware/getParticipantList')

const router = express.Router()

router.post("/slots", getAvailableSlots, participantsController)
router.get("/list", getParticipantList, participantsController)

module.exports = router