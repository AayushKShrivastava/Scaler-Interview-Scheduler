const mongoose = require('mongoose')
const config = require('../config/config')
const constants = require('../../constants/constants')
const Error = require('../../utilities/classes/Error')

class DatabaseConnectionService
{
    static async connect()
    {
        try
        {
            await mongoose.connect(config.DB_URI,{
                useUnifiedTopology: true,
                useNewUrlParser: true
            });

            console.log(`Connection opened to ${config.DB_NAME} database`);
        }
        catch(err)
        {
            await mongoose.connection.close();

            console.log(err)

            throw new Error(constants.DB_CONNECTION_ERROR.Code, constants.DB_CONNECTION_ERROR.Message)
        }
    }

    static async disconnect()
    {
        try
        {
            await mongoose.disconnect();
            
            console.log(`Connection closed to ${config.DB_NAME} database`);
        }
        catch(err)
        {
            await mongoose.connection.close();

            throw new Error(constants.DB_DISCONNECT_ERROR.Code, constants.DB_DISCONNECT_ERROR.Message)
        }
    }
}

module.exports = DatabaseConnectionService;