const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const DatabaseConnectionService = require('./db/service/DatabaseConnectionService')
const meeting = require('./routes/meeting-routes')
const participants = require('./routes/participant-routes')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/meeting',meeting)
app.use('/participants', participants)

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>console.log(`Server started on PORT ${PORT}`));