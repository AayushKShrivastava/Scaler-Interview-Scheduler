import React, { useEffect, useState } from 'react'
import API from '../api/api';
import { constants } from '../constants/constants';
import '../css/Interviews.css'
import InterviewDetails from './InterviewDetails';
import Overlay from './Overlay';

function Interviews({search}) {

    const [displayDetailsPage, setDisplayDetailsPage] = useState(false)
    const [scheduledInterviews, setScheduledInterviews] = useState([])
    const [interviewsToDisplay, setInterviewsToDisplay] = useState([]);
    const [detailsToDisplay, setDetailsToDisplay] = useState([]);

    const handleClick = (id) => {
        
        scheduledInterviews.forEach((interview) => {
            if(id === interview._id) {
                setDetailsToDisplay(interview)
                setDisplayDetailsPage(true)
                return;
            }
        })
    }

    useEffect(()=>{
        async function fetchData() {
          var interviewData = await API.get(constants.MEETING_DETAILS_URL)
          console.log(interviewData.all_meeting_details)
          setScheduledInterviews(interviewData.all_meeting_details)
        }
        fetchData();

      }, [])

      //console.log(scheduledInterviews)

    return (
        <div className='interviews'>
            <table className='interviews-table'>
                <thead>
                    <tr className='table-header'>
                        <th className='date'>Date</th>
                        <th className='title'>Title</th>
                        <th className='start-time'>Start Time</th>
                        <th className='end-time'>End Time</th>
                        <th className='partcipants'>Participants</th>
                    </tr>
                </thead>
                
                {scheduledInterviews.map((interview) => {
                    //console.log(interview)
                    return (
                        <tr className='interviews-rows' onClick={()=>handleClick(interview._id) } key={interview._id}>
                            <td>{interview.date}</td>
                            <td>{interview.title}</td>
                            <td>{interview.start_time}</td>
                            <td>{interview.end_time}</td>
                            <td>{interview.participants.length}</td>
                        </tr>
                    )
                })}
            </table>
            {displayDetailsPage && [<InterviewDetails details={detailsToDisplay} closeDetails={()=>setDisplayDetailsPage(false)}/>, <Overlay />]}
        </div>
    )
}

export default Interviews