import React, { useState } from 'react'
import '../css/SchedulerForm.css'
import Multiselect from 'multiselect-react-dropdown';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';

function SchedulerForm({toggle}) {

  const [title, setTitle] = useState('')
  const [partcipants, setParticipants] = useState([]);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('10:00');

  return (
    <div className="modal">
        <div className='close-btn' onClick={toggle}>
          <>&#10006;</>
        </div>
        <h4>Please provide interview details</h4>
        <form className='schedule-details-form'>
            <input class='newtitle' type="text"  placeholder='Title' onChange={(e)=>setTitle(e.target.value)} value={title}/>
            <Multiselect
                isObject={false}
                onKeyPressFn={function noRefCheck(){}}
                onRemove={function noRefCheck(){}}
                onSearch={function noRefCheck(){}}
                onSelect={function noRefCheck(){}}
                placeholder = 'Add Participants'
                options={[
                  'Option 1',
                  'Option 2',
                  'Option 3',
                  'Option 4',
                  'Option 5'
                ]}
                showCheckbox
            />
            <div className='interview-date'>
                <label className='interview-date-label'>Date:</label>
                <DatePicker onChange={setDate} value={date} />
            </div>

            <Multiselect
                isObject={false}
                onKeyPressFn={function noRefCheck(){}}
                onRemove={function noRefCheck(){}}
                onSearch={function noRefCheck(){}}
                onSelect={function noRefCheck(){}}
                placeholder = 'Available Time slots'
                options={[
                  'Option 1',
                  'Option 2',
                  'Option 3',
                  'Option 4',
                  'Option 5'
                ]}
                showCheckbox
                singleSelect
            />

            <div className='interview-time'>
              <div className='interview-start-time'>
                  <label className='interview-time-label'>Start Time</label>
                  <TimePicker onChange={setStartTime} value={startTime}  disableClock/>
              </div>
              <div className='interview-end-time'>
                  <label className='interview-time-label'>End Time</label>
                  <TimePicker onChange={setEndTime} value={endTime} disableClock/>
              </div>
            </div>
            
            <div className='scheduling-actions'>
                <button className='cancel' onClick={toggle}>Cancel</button>
                <button className='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default SchedulerForm