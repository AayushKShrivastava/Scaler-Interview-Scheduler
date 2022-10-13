import React, { useState } from 'react'
import API from '../api/api';
import '../css/InterviewDetails.css'
import SchedulerForm from './SchedulerForm';
import { constants } from '../constants/constants';

function InterviewDetails({details, closeDetails}) {
    const [editWindow, setEditWindow] = useState(false);

    const handleCancelMeeting = async() => {
        var requestBody  = {
            meetingId: details._id,
            title: details.title,
            date: details.date,
            start_time: details.start_time,
            end_time: details.end_time,
            participants: details.participants
        }

        var response = await API.post(constants.CANCEL_MEETING_URL, requestBody)

        if(response.status==="SUCCESS")
            window.location.reload()
    }

    return (
        <div className='modal'>
            <div className='close-btn' onClick={closeDetails}>
                <>&#10006;</>
            </div>

            <h4>{details.title} Meeting</h4>

            <div className='detail-sections'>
                <strong className='details-label'>Date:  </strong>
                <label>{details.date}</label>
            </div>

            <div className='detail-sections'>
                <strong className='details-label'>Time:  </strong>
                <label>{details.start_time} to {details.end_time}</label>
            </div>
            
            <div className='detail-sections'>
                <strong className='details-label'>Participants:  </strong>
                <label>{details.participants.length}</label>
                <ul>
                    {details.participants.map((participant)=> <li>{participant}</li>)}
                </ul>
            </div>

            <div className='interview-edit'>
                <button className='cancel-meeting-btn' onClick={handleCancelMeeting}>Cancel Meeting</button>
                <button className='interview-edit-btn' onClick={()=>setEditWindow(true)}>Edit</button>
            </div>

            {editWindow && <SchedulerForm interviewDetails={details} toggle={()=>setEditWindow(false)} submitType='Update'/>}

        </div>

    )
}

export default InterviewDetails