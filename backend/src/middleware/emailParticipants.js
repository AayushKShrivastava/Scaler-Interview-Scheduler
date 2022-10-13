const NodeMailer = require('nodemailer')
const dotenv = require('dotenv')
const constants = require('../constants/constants')

dotenv.config()

const emailParticipants = async(req, res, next) => {

    var emailType; 

    if(req.opcode === constants.opcode.CREATE_MEETING)
        emailType = 'scheduled'
    else if(req.opcode === constants.opcode.UPDATE_MEETING)
        emailType = 'updated schedule is'
    else if(req.opcode === constants.opcode.DELETE_MEETING) 
        emailType = 'cancelled'
    
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
            subject: `${req.body.title} Meeting`,
            text: `${req.body.title} meeting ${emailType} on ${req.body.date} from ${req.body.start_time} to ${req.body.end_time}`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              
            }
          });
        // emailResults = []
        // try
        // {
        //     var emailInfo = await transporter.sendMail(mailOptions)
        //     console.log(emailInfo);

        //     emailResults.push({participant : constants.SUCCESS})
        // }
        // catch(err)
        // {
        //     console.log(err)
        //     emailResults.push({participant : constants.FAILURE})
        // } 
    });
    next();
    //res.send("Done")
}

module.exports = emailParticipants;