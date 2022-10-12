const constants = require("../constants/constants")
const MeetingDetails = require("../db/schema/MeetingDetails")
const DatabaseConnectionService = require("../db/service/DatabaseConnectionService")

const getAllMeetingDetails = async(req, res, next) => {

    req.ok=true
    req.opcode=constants.opcode.ALL_MEETING_DETAILS

    try
    {
        //Connect to the database
        DatabaseConnectionService.connect();

        var allMeetingDetails = await MeetingDetails.find({})
        console.log(allMeetingDetails);

        req.allMeetingDetails = allMeetingDetails;

        next();
    }
    catch(err)
    {   
        req.ok=false;
        console.log(err)
        req.error={};

        if(err.code === constants.DB_CONNECTION_ERROR || err.code === constants.DB_DISCONNECT_ERROR)
            req.error=err
        else
        {
            req.error.status = constants.FAILURE;
            req.error.code = constants.SERVER_ERROR.Code;
            req.error.message = constants.SERVER_ERROR.Message;
        }

        next();
    }
}

module.exports = getAllMeetingDetails