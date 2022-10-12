const constants = require("../constants/constants")

const meetingController = (req, res) => {
    if(req.ok)
    {
        if(req.opcode == constants.opcode.GET_DETAILS)
        {
            var responseData = {
                opcode : constants.opcode.GET_DETAILS,
                status : constants.SUCCESS,
                meeting_id : req.meetingDetails._id,
                title : req.meetingDetails.title,
                date : req.meetingDetails.date,
                start_time : req.meetingDetails.start_time,
                end_time : req.meetingDetails.end_time,
                participants : req.meetingDetails.participants
            }

            res.status(200).json(responseData);
        }
        else if(req.opcode === constants.opcode.CREATE_MEETING)
        {
            var responseData = {
                opcode : constants.opcode.CREATE_MEETING,
                status : constants.SUCCESS,
                meeting_details : {
                    meeting_id : req.saveData._id,
                    date : req.saveData.date,
                    start_time : req.saveData.start_time,
                    end_time : req.saveData.end_time,
                    participants : req.saveData.participants
                },
                message : constants.message.MEETING_SCHEDULED_SUCCESS
            }

            res.status(200).json(responseData);
        }
        else if(req.opcode === constants.opcode.UPDATE_MEETING)
        {
            var responseData = {
                opcode : constants.opcode.UPDATE_MEETING,
                status : constants.SUCCESS,
                meeting_details : {
                    meeting_id : req.body.meeting_id,
                    date : req.body.date,
                    title : req.body.title,
                    start_time : req.body.start_time,
                    end_time : req.body.end_time,
                    participants : req.body.participants
                },
                message : constants.message.MEETING_UPDATED
            }

            res.status(200).json(responseData);
        }   
        else if(req.opcode === constants.opcode.DELETE_MEETING)
        {
            var responseData = {
                opcode : constants.opcode.DELETE_MEETING,
                status : constants.SUCCESS,
                meeting_details : {
                    meeting_id : req.meetingDetails.meeting_id,
                    date : req.meetingDetails.date,
                    title : req.meetingDetails.title,
                    start_time : req.meetingDetails.start_time,
                    end_time : req.meetingDetails.end_time,
                    participants : req.meetingDetails.participants
                },
                message : constants.message.MEETING_CANCELLED
            }

            res.status(200).json(responseData);
        }
        else if(req.opcode === constants.opcode.ALL_MEETING_DETAILS)
        {
            var responseData = {
                opcode : constants.opcode.ALL_MEETING_DETAILS,
                status : constants.SUCCESS,
                all_meeting_details : req.allMeetingDetails
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

module.exports = meetingController