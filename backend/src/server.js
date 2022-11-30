const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const DatabaseConnectionService = require('./db/service/DatabaseConnectionService')
const fileHandler = require('./routes/file-routes')
const meeting = require('./routes/meeting-routes')
const participants = require('./routes/participant-routes')
const formData = require('express-form-data')
const statusMonitor = require('express-status-monitor')

dotenv.config()

const app = express()

app.use(statusMonitor())

app.use(cors())

//for parsing application/json
app.use(express.json())

//for parsing multipart/form-data
app.use(formData.parse())

app.use('/meeting',meeting)
app.use('/participants', participants)
app.use("/file",fileHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>console.log(`Server started on PORT ${PORT}`));