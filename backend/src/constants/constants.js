var constants = {
    DB_CONNECTION_ERROR : {
        Code : 5001,
        Message: "Unable to connect to the database. Please check your internet connection or firewall/proxy settings"
    },
    DB_DISCONNECT_ERROR : {
        Code : 5002,
        Message : "Failed to Disconnect from the Database. Forced to close the database connection",
    },
    INVALID_MEETING_ERROR : {
        Code : 5004,
        Message : "The Meeting ID is invalid."
    },
    INVALID_REQUEST : {
        Code : 4001,
        Message : "The request format is invalid. Missing required parameters or invalid data-type for the request parameters"
    },
    FAILURE : "FAILURE",
    SUCCESS : "SUCCESS",
    SERVER_ERROR : {
        Code : 5050,
        Message : "An unknown server-error occured."
    },
    opcode : {
        GET_DETAILS : "MEETING_DETAILS",
        CREATE_MEETING : "SETUP_MEETING",
        UPDATE_MEETING : "UPDATE_MEETING",
        DELETE_MEETING : "CANCEL_MEETING",
        LIST_USERS : "LIST_USERS",
        LIST_AVAILABLE_SLOTS : "LIST_AVAILABLE_SLOTS",
        ALL_MEETING_DETAILS : "FETCH_ALL_MEETING_DETAILS"
    },
    message : {
        MEETING_SCHEDULED_SUCCESS : "Meeting Scheduled Successfully!",
        MEETING_UPDATED : "This event has been updated",
        MEETING_CANCELLED : "This event has been cancelled"
    }
}

module.exports = constants