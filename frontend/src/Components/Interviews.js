import React, { useState } from 'react'
import '../css/Interviews.css'
import InterviewDetails from './InterviewDetails';
import Overlay from './Overlay';

function Interviews({interviewsToDisplay}) {

    const [displayDetailsPage, setDisplayDetailsPage] = useState(false)
    const [detailsToDisplay, setDetailsToDisplay] = useState([]);

    const handleClick = (id) => {
        
        interviewsToDisplay.forEach((interview) => {
            if(id === interview._id) {
                setDetailsToDisplay(interview)
                setDisplayDetailsPage(true)
                return;
            }
        })
    }

    

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
                
                {interviewsToDisplay.map((interview) => {
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