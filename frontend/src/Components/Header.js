import React, { useState } from 'react'
import API from '../api/api';
import { constants } from '../constants/constants';
import '../css/Header.css'
import Overlay from './Overlay';
import SchedulerForm from './SchedulerForm';

function Header() {

  const [displayScheduler, setDisplayScheduler] = useState(false);
  const [participantNames, setParticipantNames] = useState([]);
  const [participantEmails, setParticipantEmails] = useState([]);
  
  async function handleScheduleButtonClick()
  {
    var participantList = await API.get(constants.LIST_PARTICIPANTS_URL)
    console.log("Users", participantList.Users)

    var names = []
    var emails = []

    participantList.Users.forEach(participantData => {
        names.push(participantData.name)
        emails.push(participantData._id)
    });

    setParticipantNames(names)
    setParticipantEmails(emails)
    setDisplayScheduler(true)
  }

  return (
    <div className='header'>
        <p className="header-title">Scaler Interview Scheduler</p>
        <button className='header-scheduler' onClick={handleScheduleButtonClick}>Schedule an Interview</button>
        {displayScheduler && <SchedulerForm toggle = {()=>setDisplayScheduler(false)} participantList={participantNames} participantEmailList={participantEmails} submitType='Create'/> }
        {displayScheduler  && <Overlay />}
    </div>

    
  )
}

export default Header