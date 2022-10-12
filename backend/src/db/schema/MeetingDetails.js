const mongoose = require("mongoose")

const MeetingDetails = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    start_time : {
        type : String,
        required : true   
    },
    end_time : {
        type : String,
        required : true
    },
    participants : {
        type : Array,
        required : true
    }
});

module.exports = mongoose.model("MeetingDetails", MeetingDetails);