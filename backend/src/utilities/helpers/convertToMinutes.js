//Utility function to convert a 24 hr timestring to minutes
//14:30 => 870
const convertToMinutes = (time) => {
    var minutes = parseInt(time.substring(0, 2))*60 + parseInt(time.substring(3,5))
    
    return minutes
}

module.exports = convertToMinutes