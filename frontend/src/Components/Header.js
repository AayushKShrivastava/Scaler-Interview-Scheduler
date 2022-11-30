import React, { useState } from 'react'
import API from '../api/api';
import { constants } from '../constants/constants';
import '../css/Header.css'
import Overlay from './Overlay';
import SchedulerForm from './SchedulerForm';
import { useNavigate } from 'react-router-dom';

function Header() {

  const [displayScheduler, setDisplayScheduler] = useState(false);
  const [participantNames, setParticipantNames] = useState([]);
  const [participantEmails, setParticipantEmails] = useState([]);
  
    const navigate = useNavigate()

  async function handleScheduleButtonClick()
  {
    setDisplayScheduler(true)

    //fetching all participants data to be displayed on the interview scheduling form
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
    
  }

  return (
    <div className='header'>
        <p className="header-title">Interview Scheduler</p>
        <div className='header-actions'>
            <button className='header-button' onClick={()=>navigate('/sla')}>SLA</button>
            <button className='header-button' onClick={handleScheduleButtonClick}>Schedule an Interview</button>
        </div>
        {displayScheduler && [<Overlay />,<SchedulerForm toggle = {()=>setDisplayScheduler(false)} participantList={participantNames} participantEmailList={participantEmails} submitType='Create'/>] }
    </div>

    
  )
}

export default Header