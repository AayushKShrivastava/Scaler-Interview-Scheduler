const mongoose = require('mongoose')

const Participant = {
    _id : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
}

module.exports = mongoose.model("Participant", Participant);