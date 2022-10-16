import React, { useState } from 'react'
import API from '../api/api';
import '../css/InterviewDetails.css'
import SchedulerForm from './SchedulerForm';
import { constants } from '../constants/constants';
import { FiDownload } from 'react-icons/fi'

function InterviewDetails({details, closeDetails}) {
    const [editWindow, setEditWindow] = useState(false);
    const [participantEmails, setParticipantEmails] = useState([]);
    const [alertMessage, setAlertMessage] = useState(' ')

    // seeting data to be sent to update form when edit button is clicked
    async function handleEditButtonClick()
    {
        setEditWindow(true)
        var participantList = await API.get(constants.LIST_PARTICIPANTS_URL)
        console.log("Users", participantList.Users)

        var emails = []

        participantList.Users.forEach(participantData => {
            emails.push(participantData._id)
        });

        setParticipantEmails(emails)
    }

    // function to cancel a scheduled meeting
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


    //sending request to download the meeting attachments uploaded
    const handleFileDownload = async() => {
        
        var response = await API.get(`${constants.DOWNLOAD_FILE_URL}?meetingId=${details._id}`)
        if(response.status !== 'SUCCESS')
            setAlertMessage("No uploaded files found for this meeting")
        else
            setAlertMessage('')
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

            <div className='alert'>{alertMessage}</div>
            <br/>

            <div className='footer-button'>
                <button className='download-attachment' onClick={handleFileDownload}>Download attachment<FiDownload /></button>

                <div className='interview-edit'>
                    <button className='cancel-meeting-btn' onClick={handleCancelMeeting}>Cancel Meeting</button>
                    <button className='interview-edit-btn' onClick={handleEditButtonClick}>Edit</button>
                </div>
            </div>

            {/* display interview updating form if ediit button has been clicked */}
            {editWindow && <SchedulerForm interviewDetails={details} participantEmailList={participantEmails} toggle={()=>setEditWindow(false)} submitType='Update'/>}

        </div>

    )
}

export default InterviewDetails