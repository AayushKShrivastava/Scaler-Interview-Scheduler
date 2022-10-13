import React, { useEffect, useState } from 'react'
import '../css/SchedulerForm.css'
import Multiselect from 'multiselect-react-dropdown';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import API from '../api/api';
import { constants } from '../constants/constants';

function SchedulerForm({interviewDetails, toggle, participantEmailList, submitType}) {

  const [participants, setParticipants] = useState(participantEmailList)
  const [alertMessage, setAlertMessage] = useState(' ')
  const [availableTimeSlots, setAvailableTimeSlots] = useState([])
  const [title, setTitle] = useState(interviewDetails ? interviewDetails.title : '')
  const [selectdPartcipants, setSelectdParticipants] = useState(interviewDetails? interviewDetails.participants : []);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(interviewDetails ? interviewDetails.start_time : '09:00');
  const [endTime, setEndTime] = useState(interviewDetails ? interviewDetails.end_time : '23:00');
  const [minTime, setMinTime] = useState('')
  const [maxTime, setMaxTime] = useState('')

  const handleClose = () => {
    setTitle('')
    setSelectdParticipants([])
    setDate(new Date())
    setStartTime('')
    setEndTime('')
    toggle();
  }

  const updateTimeRange = (selectedList, selectedItem) => {
      console.log(selectedItem)
      console.log("Min-time", selectedItem.substring(0,5))
      console.log("Max-time",selectedItem.substring(8,13))
      setMinTime(selectedItem.substring(0,5))
      setMaxTime(selectedItem.substring(8,13))
  }

  const handleSubmit = async() => {
    if(submitType === "Create")
    {
      console.log("Submitting...")
      if(title.trim()==='' || selectdPartcipants.length===0 || availableTimeSlots.length===0 || startTime<minTime 
        || endTime>maxTime || startTime>endTime || startTime==='' || endTime==='')
        setAlertMessage("Please fill in all the details")
      else
      {
        setAlertMessage(' ')
        
        var requestBody = {
            title : title,
            date : `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`,
            start_time : startTime,
            end_time : endTime,
            participants : selectdPartcipants
        }

        var response = await API.post(constants.SCHEDULE_MEETING_URL, requestBody)
      }
    }
    else if(submitType==="Update")
    {
      setAlertMessage(' ')
      console.log('Updating...')
      var requestBody = {
        meetingId : interviewDetails._id,
        title : title,
        date : `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`,
        start_time : startTime,
        end_time : endTime,
        participants : selectdPartcipants
      }

      var response = await API.post(constants.EDIT_MEETING_URL, requestBody)
    }
    console.log(response)

    if(response.status==="SUCCESS")
      window.location.reload()
  

    handleClose();
  }

  const updateParticipantsList = (selectedList, selectedItem) => {
      setSelectdParticipants(selectedList);
  }

  const handleMouseEnter = async() => {

    var requestBody = {
      date : `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`,
      participants : selectdPartcipants
    }

    var response = await API.post(constants.LIST_AVAILABLE_SLOTS_URL, requestBody)

    console.log(response)
    var timeslots = []
    response.available_slots.forEach((slot) => {
      timeslots.push(slot.start_time + " - " + slot.end_time)
    })
    setAvailableTimeSlots(timeslots)
  }

  return (
    <div className="modal">
        <div className='close-btn' onClick={handleClose}>
          <>&#10006;</>
        </div>
        <h4>Please provide interview details</h4>
        <div className='schedule-details-form'>
            <input className='newtitle' type="text"  placeholder='Title' onChange={(e)=>setTitle(e.target.value)} value={title}/>
            <Multiselect
                isObject={false}
                onKeyPressFn={function noRefCheck(){}}
                onRemove={updateParticipantsList}
                onSearch={function noRefCheck(){}}
                onSelect={updateParticipantsList}
                selectedValues={interviewDetails && interviewDetails.participants}
                placeholder = 'Add Participants'
                options={participants}
                showCheckbox
                className='select-participants-list'
            />
            <div className='interview-date'>
                <label className='interview-date-label'>Date:</label>
                <DatePicker onChange={setDate} value={date} format="dd-MM-yyyy"/>
            </div>

            <div onMouseEnter={()=>handleMouseEnter()} onMouseLeave={()=>console.log("Focus Lost")}>
              <Multiselect
                  isObject={false}
                  onKeyPressFn={function noRefCheck(){}}
                  onRemove={updateTimeRange}
                  onSearch={function noRefCheck(){}}
                  onSelect={updateTimeRange}
                  placeholder = 'Available Time slots'
                  options={availableTimeSlots}
                  showCheckbox
                  singleSelect
            />
            </div>

            <div className='interview-time'>
              <div className='interview-start-time'>
                  <label className='interview-time-label'>Start Time</label>
                  <TimePicker 
                      onChange={setStartTime} 
                      value={startTime}  
                      disableClock 
                      hourPlaceholder="hh" 
                      minutePlaceholder="mm" 
                      locale='hu-HU'
                      // format='HH:mm'
                      minTime={minTime} maxTime={maxTime}
                    />
              </div>
              <div className='interview-end-time'>
                  <label className='interview-time-label'>End Time</label>
                  <TimePicker 
                      onChange={setEndTime} 
                      value={endTime} 
                      disableClock 
                      hourPlaceholder="hh" 
                      minutePlaceholder="mm"
                      locale='hu-HU' 
                      // format='HH:mm'
                      minTime={minTime} maxTime={maxTime}
                  />
              </div>
            </div>
            <div className='alert'>{alertMessage}</div>
            <br/>
            <div className='scheduling-actions'>
                <button className='cancel' onClick={handleClose}>Cancel</button>
                <button className='submit' onClick={handleSubmit}>{submitType === 'Create' ? "Submit" : "Update"}</button>
            </div>
        </div>
    </div>
  )
}

export default SchedulerForm