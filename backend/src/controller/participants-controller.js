const constants = require("../constants/constants");

const participantsController = (req,res) => {

    if(req.ok)
    {
        if(req.opcode === constants.opcode.LIST_USERS)
        {
            responseData = {
                opcode : constants.opcode.LIST_USERS,
                status : constants.SUCCESS,
                Users : req.queryResult
            }

            res.status(200).json(responseData)
        }
        else if(req.opcode === constants.opcode.LIST_AVAILABLE_SLOTS)
        {
            responseData = {
                opcode : constants.opcode.LIST_AVAILABLE_SLOTS,
                status : constants.SUCCESS,
                available_slots : req.available_slots
            }

            res.status(200).json(responseData)
        }
    }
    else
    {
        var responseData = {
            opcode : req.opcode,
            status : constants.FAILURE,
            error : {
                code : req.error.code,
                message : req.error.message
            }
        }
        if(req.error.code === constants.INVALID_REQUEST.Code)
        {
            res.status(400).json(responseData);   
        }
        else
        {
            res.status(500).json(responseData);
        }
    }
}

module.exports = participantsController