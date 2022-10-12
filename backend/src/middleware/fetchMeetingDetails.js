const DatabaseConnectionService = require('../db/service/DatabaseConnectionService')
const constants = require('../constants/constants')
const MeetingDetails = require('../db/schema/MeetingDetails')
const Error = require('../utilities/classes/Error')

const fetchMeetingDetails = async(req, res, next) => {

    req.ok = true
    req.opcode = constants.opcode.DELETE_MEETING

    var meeting_id = req.body.meetingId

    try
    {
        //Connect to the Database
        DatabaseConnectionService.connect();

        if(meeting_id === null || meeting_id === undefined)
            throw new Error(constants.INVALID_REQUEST.Code, constants.INVALID_REQUEST.Message)
        
        var meetingDetails = await MeetingDetails.find({_id: meeting_id})

        console.log("Meeting Details", meetingDetails)

        if(meetingDetails.length === 0)
            throw new Error(constants.INVALID_MEETING_ERROR.Code, constants.INVALID_MEETING_ERROR.Message)

        req.meetingDetails = meetingDetails[0];

        next();
    }
    catch(err)
    {
        req.ok = false
        console.log(err)
        req.error = {}

        if(err.code === constants.DB_CONNECTION_ERROR.Code || err.code === constants.DB_DISCONNECT_ERROR.Code 
            || err.code === constants.INVALID_MEETING_ERROR.Code || err.code === constants.INVALID_REQUEST.Code)
            req.error = err
        else
        {
            req.error.status = constants.FAILURE;
            req.error.code = constants.SERVER_ERROR.Code;
            req.error.message = constants.SERVER_ERROR.Message;
        }

        next();
    }
}

module.exports = fetchMeetingDetails