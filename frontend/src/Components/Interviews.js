import React, { useState } from 'react'
import '../css/Interviews.css'
import InterviewDetails from './InterviewDetails';
import Overlay from './Overlay';
import SchedulerForm from './SchedulerForm';

function Interviews() {

    const [displayDetails, setDisplayDetails] = useState(false)
    
  return (
    <div className='interviews'>
        <table className='interviews-table'>
            <tr className='table-header'>
                <th className='date'>Date</th>
                <th className='title'>Title</th>
                <th className='start-time'>Start Time</th>
                <th className='end-time'>End Time</th>
                <th className='partcipants'>Participants</th>
            </tr>

            <tr className='interviews-rows' onClick={()=>setDisplayDetails(true)}>
                 <>
                    <td>26-10-2022</td>
                    <td>Campus Hiring</td>
                    <td>1:30pm</td>
                    <td>2:00pm</td>
                    <td>40</td>
                 </>
                
            </tr>

            <tr className='interviews-rows' onClick={()=>setDisplayDetails(true)}>
                <td>26-10-2022</td>
                <td>Campus Hiring</td>
                <td>1:30pm</td>
                <td>2:00pm</td>
                <td>40</td>
            </tr>
        </table>
        {displayDetails && [<InterviewDetails closeDetails={()=>setDisplayDetails(false)}/>, <Overlay />]}
    </div>
  )
}

export default Interviews