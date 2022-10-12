const constants = require("../constants/constants")
const MeetingDetails = require("../db/schema/MeetingDetails")
const DatabaseConnectionService = require("../db/service/DatabaseConnectionService")
const Error = require("../utilities/classes/Error")
const convertToMinutes = require('../utilities/helpers/convertToMinutes')

const getAvailableSlots = async(req, res, next) => {

    req.ok = true
    req.opcode = constants.opcode.LIST_AVAILABLE_SLOTS

    var date = req.body.date
    var participantList = req.body.participants

    try
    {
        if(date === null || date === undefined || participantList === null || participantList === undefined)
            throw new Error(constants.INVALID_REQUEST.Code, constants.INVALID_REQUEST.Message)

        //Connect to the database
        DatabaseConnectionService.connect();

        var scheduledInterviews = await MeetingDetails.find({date: date});
        var booked_slots = []

        scheduledInterviews.forEach(interview => {
            for(let i=0;i<interview.participants.length;i++)
            {
                if(participantList.includes(interview.participants[i]))
                {
                    console.log(interview.participants[i])
                    booked_slots.push([interview.start_time, interview.end_time])
                    break;
                }
            }
        });

        var available_slots = [];

        if(booked_slots.length === 0){
            available_slots.push({start_time:"09:00",end_time: "23:00"});
        }
        else {
            booked_slots.sort((a, b) =>  a[0]<b[0])

            // meeting will only be scheduled between 9:00am to 11:00pm (540 min - 1380)
            

            if(convertToMinutes(booked_slots[0][0]) > convertToMinutes("09:00")){
                available_slots.push({start_time:"09:00",end_time: booked_slots[0][0]});
            }

            let last_end_time = booked_slots[0][1], n = booked_slots.length;

            for(let i = 1; i < n; i++) {
                if(convertToMinutes(booked_slots[i][0]) > convertToMinutes(last_end_time)){
                    available_slots.push({start_time: last_end_time, end_time : booked_slots[i][0]})
                }
                if(convertToMinutes(booked_slots[i][1]) > convertToMinutes(last_end_time)){
                    last_end_time = booked_slots[i][1]
                }
            }

            if(convertToMinutes(last_end_time) < convertToMinutes("23:00"))
                available_slots.push({start_time: last_end_time, end_time: "23:00"})

        }
        
        console.log("Available slots", available_slots)
        console.log("Previously Booked Slots", booked_slots)

        req.available_slots = available_slots;
        
        next();
    }
    catch(err)
    {
        req.ok = false;
        req.error = {}
        console.log(err)

        if(err.code === constants.INVALID_REQUEST.Code || err.code === constants.DB_CONNECTION_ERROR.Code || err.code === constants.DB_DISCONNECT_ERROR.Code)
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

module.exports = getAvailableSlots