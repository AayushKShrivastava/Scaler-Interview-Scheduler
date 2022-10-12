const dotenv = require('dotenv')

dotenv.config();

var config = {
    DB_URI : process.env.MONGODB_CONNECTION_STRING,
    DB_NAME : "SchedulerDB"
}

module.exports = config;