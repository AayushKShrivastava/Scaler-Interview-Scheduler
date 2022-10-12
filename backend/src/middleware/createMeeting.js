const express = require('express');
const constants = require('../constants/constants');
const MeetingDetails = require('../db/schema/MeetingDetails');
const DatabaseConnectionService = require('../db/service/DatabaseConnectionService');
const Error = require('../utilities/classes/Error')

const createMeeting = async(req, res, next) => {

    req.ok = true;
    req.opcode = constants.opcode.CREATE_MEETING

    var title = req.body.title
    var date = req.body.date
    var start_time = req.body.start_time
    var end_time = req.body.end_time
    var participants = req.body.participants

    try
    {

        DatabaseConnectionService.connect();

        if(title===null || title===undefined || date===null || date===undefined || start_time===null || start_time===undefined
            || end_time===null || end_time===undefined || participants===null || participants===undefined)
            throw new Error(constants.INVALID_REQUEST.Code, constants.INVALID_REQUEST.Message)
        
        var meetingDetailsObj = {
            title : title,
            date : date,
            start_time : start_time,
            end_time : end_time,
            participants : participants
        }

        var meetingDetails = new MeetingDetails(meetingDetailsObj);

        var saveResult = await meetingDetails.save();

        console.log(saveResult);
        req.saveData = saveResult

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

module.exports = createMeeting