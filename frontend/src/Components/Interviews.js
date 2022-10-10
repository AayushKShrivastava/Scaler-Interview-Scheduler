import React from 'react'
import '../css/Interviews.css'

function Interviews() {
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

            <tr>
                <td>26-10-2022</td>
                <td>Campus Hiring</td>
                <td>1:30pm</td>
                <td>2:00pm</td>
                <td>40</td>
            </tr>

            <tr>
                <td>26-10-2022</td>
                <td>Campus Hiring</td>
                <td>1:30pm</td>
                <td>2:00pm</td>
                <td>40</td>
            </tr>
        </table>
    </div>
  )
}

export default Interviews