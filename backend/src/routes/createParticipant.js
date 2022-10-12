const Participant = require("../db/schema/Participant")
const DatabaseConnectionService = require("../db/service/DatabaseConnectionService")

const createParticipant = async(req, res) => {

    var data = {
        _id : req.body.email,
        name : req.body.name
    }

    DatabaseConnectionService.connect()

    var participant = new Participant(data)

    var saveResult=await participant.save()

    console.log(saveResult);

    res.json(saveResult)

}

module.exports = createParticipant