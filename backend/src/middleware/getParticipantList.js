const constants = require("../constants/constants")
const Participant = require("../db/schema/Participant")
const DatabaseConnectionService = require("../db/service/DatabaseConnectionService")

const getParticipantList = async(req, res, next) => {

    req.ok = true
    req.opcode = constants.opcode.LIST_USERS
    try
    {
        //Connect to the database
        await DatabaseConnectionService.connect()

        var queryResult = await Participant.find({})

        console.log(queryResult)
        req.queryResult = queryResult

        next();
    }
    catch(err)
    {
        req.ok = false;
        console.log(err)
        req.error = {}

        if(err.code === constants.DB_CONNECTION_ERROR.Code || err.code === constants.DB_DISCONNECT_ERROR.Code)
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

module.exports = getParticipantList