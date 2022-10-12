const DatabaseConnectionService = require('../db/service/DatabaseConnectionService');
const constants = require('../constants/constants')
const MeetingDetails = require('../db/schema/MeetingDetails')

const cancelMeeting = async(req, res, next) => {

    if(req.ok)
    {
        try
        {

            var meeting_id = req.body.meetingId

            DatabaseConnectionService.connect()

            if(meeting_id===null || meeting_id===undefined)
                throw new Error(constants.INVALID_REQUEST.Code, constants.INVALID_REQUEST.Message)

            var deleteResult = await MeetingDetails.deleteOne({_id : meeting_id});

            console.log(deleteResult);
            req.deleteData = deleteResult

            next();
        }
        catch(err)
        {
            req.ok = false;
            req.error = {};
            console.log(err)

            if(err.code===constants.DB_CONNECTION_ERROR.Code || err.code===constants.DB_DISCONNECT_ERROR.Code || err.code===constants.INVALID_REQUEST.Code)
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
    else 
    {
        next();
    }
}

module.exports = cancelMeeting