const MeetingDetails = require('../db/schema/MeetingDetails');
const DatabaseConnectionService = require('../db/service/DatabaseConnectionService');
const constants = require('../constants/constants')
const Error = require('../utilities/classes/Error')

const getMeetingDetails = async(req, res, next) => {
    
    req.ok = true;
    req.opcode = constants.opcode.GET_DETAILS
    var meetingId = req.query.meetingId;
    console.log(meetingId)
    try
    {
        //Connect to database
        await DatabaseConnectionService.connect();

        req.ok = true;

        //Retreive the data from the Database
        let meetingDetails = await MeetingDetails.find({_id:meetingId});

        console.log(meetingDetails);

        if(meetingDetails.length === 0)
        {
            throw new Error(constants.INVALID_MEETING_ERROR.Code, constants.INVALID_MEETING_ERROR.Message)
        }

        req.meetingDetails = meetingDetails[0];

        next();
    }
    catch(err)
    {
        req.ok = false;
        req.error = {};
        console.log(err)
        if(err.code === constants.DB_CONNECTION_ERROR.Code || err.code === constants.DB_DISCONNECT_ERROR.Code
            || err.code === constants.INVALID_MEETING_ERROR.Code)
            req.error = err;
        else
        {
            req.error.status = constants.FAILURE;
            req.error.code = constants.SERVER_ERROR.Code;
            req.error.message = constants.SERVER_ERROR.Message;
        }

        next();

    }
}

module.exports = getMeetingDetails;