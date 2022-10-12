const constants = require('../../constants/constants')

class Error
{
    constructor(code, message)
    {
        this.status = constants.FAILURE;
        this.code = code;
        this.message = message
    }
}

module.exports = Error