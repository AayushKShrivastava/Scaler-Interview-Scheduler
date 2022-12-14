const express = require('express')
const getMeetingDetails = require('../middleware/getMeetingDetails')
const meetingController = require('../controller/meeting-controller')
const createMeeting = require('../middleware/createMeeting')
const updateMeeting = require('../middleware/updateMeeting')
const cancelMeeting = require('../middleware/cancelMeeting')
const fetchMeetingDetails = require('../middleware/fetchMeetingDetails')
const getAllMeetingDetails = require('../middleware/getAllMeetingDetails')
const emailParticipants = require('../middleware/emailParticipants')

const router = express.Router();

router.get("/all",getAllMeetingDetails, meetingController)
router.get("/details",getMeetingDetails, meetingController);
router.post("/create",createMeeting, emailParticipants, meetingController);
router.post("/update",updateMeeting, emailParticipants, meetingController);
router.post("/delete", fetchMeetingDetails,cancelMeeting, emailParticipants, meetingController);


module.exports = router;