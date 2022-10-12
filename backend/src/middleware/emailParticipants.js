const NodeMailer = require('nodemailer')
const dotenv = require('dotenv')
const constants = require('../constants/constants')

dotenv.config()

const emailParticipants = async(req, res, next) => {
    
    console.log("Credentials ",process.env.ADMIN_EMAILID,process.env.PASSWORD)

    var transporter = NodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ADMIN_EMAILID,
            pass: process.env.PASSWORD
        }
    })

    req.body.participants.forEach(async(participant) => {
        var mailOptions = {
            from: process.env.ADMIN_EMAILID,
            to: participant,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };
        emailResults = []
        try
        {
            var emailInfo = await transporter.sendMail(mailOptions)
            console.log(emailInfo);

            emailResults.push({participant : constants.SUCCESS})
        }
        catch(err)
        {
            console.log(err)
            emailResults.push({participant : constants.FAILURE})
        } 
    });

    res.send("Done")
}

module.exports = emailParticipants;