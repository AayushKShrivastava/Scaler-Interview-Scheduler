import React, { useState } from 'react'
import '../css/Interviews.css'
import InterviewDetails from './InterviewDetails';
import Overlay from './Overlay';
import { usePromiseTracker } from "react-promise-tracker";
import {ThreeDots} from 'react-loader-spinner';
import TableFooter from './TableFooter';
import useTable from '../hooks/useTable'

const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress && 
        <div className='loader'>
            <ThreeDots color="#2BAD60" height="100" width="100" />
        </div>
    );  
}

function Interviews({interviewsToDisplay, rowsPerPage}) {

    const [displayDetailsPage, setDisplayDetailsPage] = useState(false)
    const [detailsToDisplay, setDetailsToDisplay] = useState([]);
    const [page, setPage] = useState(1);
    const { slice: interviewsSliceToDisplay, range } = useTable(interviewsToDisplay, page, rowsPerPage);
    
    const handleClick = (id) => {
        
        interviewsSliceToDisplay.forEach((interview) => {
            if(id === interview._id) {
                setDetailsToDisplay(interview)
                setDisplayDetailsPage(true)
                return;
            }
        })
    }

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
                
                {interviewsSliceToDisplay.map((interview) => {
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
            <TableFooter range={range} slice={interviewsSliceToDisplay} setPage={setPage} page={page} />
            <LoadingIndicator />
            {/* <TablePagination /> */}
            {displayDetailsPage && [<Overlay />,<InterviewDetails details={detailsToDisplay} closeDetails={()=>setDisplayDetailsPage(false)}/>]}
        </div>
    )
}

export default Interviews