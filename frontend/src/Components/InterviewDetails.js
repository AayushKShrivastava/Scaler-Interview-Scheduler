import React, { useState } from 'react'
import '../css/InterviewDetails.css'
import Overlay from './Overlay'
import SchedulerForm from './SchedulerForm';

function InterviewDetails({closeDetails}) {

    const [editWindow, setEditWindow] = useState(false);

  return (
    <div className='modal'>
        <div className='close-btn' onClick={closeDetails}>
            <>&#10006;</>
        </div>

        <h4>Campus Meeting Details</h4>
        <div className='detail-sections'>
            <strong className='details-label'>Date:  </strong>
            <label>26-10-2022</label>
        </div>

        <div className='detail-sections'>
            <strong className='details-label'>Time:  </strong>
            <label>1:30pm to 2:30pm</label>
        </div>
        
        <div className='detail-sections'>
            <strong className='details-label'>Participants:  </strong>
            <label>40</label>
            <ul>
                <li>Aayush Shrivastava</li>
                <li>Abhineet Pandey</li>
                <li>Abhijeet Singh</li>
                <li>Abhishek Dubey</li>
                <li>Abhishek Singh</li>
                <li>Aayush Shrivastava</li>
                <li>Abhineet Pandey</li>
                <li>Abhijeet Singh</li>
                <li>Abhishek Dubey</li>
                <li>Abhishek Singh</li>
                <li>Aayush Shrivastava</li>
                <li>Abhineet Pandey</li>
                <li>Abhijeet Singh</li>
                <li>Abhishek Dubey</li>
                <li>Abhishek Singh</li>
            </ul>
        </div>

        <div className='interview-edit'>
            <button className='interview-edit-btn' onClick={()=>setEditWindow(true)}>Edit</button>
        </div>
        {editWindow && <SchedulerForm toggle={()=>setEditWindow(false)}/>}
    </div>

  )
}

export default InterviewDetails