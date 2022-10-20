import React, { useState } from 'react'
import '../css/SchedulerForm.css'
import Multiselect from 'multiselect-react-dropdown';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import API from '../api/api';
import { constants } from '../constants/constants';

function SchedulerForm({interviewDetails, toggle, participantEmailList, submitType}) {

  const [alertMessage, setAlertMessage] = useState(' ')
  const [availableTimeSlots, setAvailableTimeSlots] = useState([])
  const [title, setTitle] = useState(interviewDetails ? interviewDetails.title : '')
  const [selectdPartcipants, setSelectdParticipants] = useState(interviewDetails? interviewDetails.participants : []);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(interviewDetails ? interviewDetails.start_time : '09:00');
  const [endTime, setEndTime] = useState(interviewDetails ? interviewDetails.end_time : '23:00');
  const [minTime, setMinTime] = useState('')
  const [maxTime, setMaxTime] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleClose = () => {
    setTitle('')
    setSelectdParticipants([])
    setDate(new Date())
    setStartTime('')
    setEndTime('')
    setUploadedFile(null)
    toggle();
  }

  //update time range based on the selected time slot
  const updateTimeRange = (selectedList, selectedItem) => {
      console.log(selectedItem)
      console.log("Min-time", selectedItem.substring(0,5))
      console.log("Max-time",selectedItem.substring(8,13))
      setMinTime(selectedItem.substring(0,5))
      setMaxTime(selectedItem.substring(8,13))
  }

  // function to handle file upload
  const handleFileUpload=(event)=>{
    console.log(event.target.files[0].type)
    if(event.target.files[0].type!=='application/x-zip-compressed')
    {
      console.log(constants.UNSUPPORTED_FILE_TYPE)
      setAlertMessage(constants.UNSUPPORTED_FILE_TYPE)
    }
    else
    {
      setUploadedFile(event.target.files[0])
    }
  }

  const handleFileSubmit=async (meetingId)=>{
    if(uploadedFile!==null)
    {
      let formdata = new FormData();
      formdata.append("file",uploadedFile);
      formdata.append("meetingId", meetingId);

      var response = await API.post(constants.UPLOAD_FILE_URL, formdata)
      
      return response.status
    }
  }

  const handleSubmit = async() => {

    //if a new meeting is to created
    if(submitType === "Create")
    {
      // data validation
      if(title.trim()==='' || selectdPartcipants.length<2 || availableTimeSlots.length===0 || startTime<minTime 
        || endTime>maxTime || startTime>=endTime || startTime==='' || endTime==='') {
          if(selectdPartcipants.length<2)
            setAlertMessage("Select atleast two participants")
          else
            setAlertMessage("Please fill in all the details")
        }
        
      else
      {
        setAlertMessage(' ')
        console.log("Submitting...")
        let requestBody = {
            title : title,
            date : `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`,
            start_time : startTime,
            end_time : endTime,
            participants : selectdPartcipants
        }

        var response = await API.post(constants.SCHEDULE_MEETING_URL, requestBody)
        if(response.status === "SUCCESS")
        {
          // submit uploaded file
          if(uploadedFile!==null)
          {
            var fileSubmitStatus = await handleFileSubmit(response.meeting_details.meeting_id)
            console.log(fileSubmitStatus)
            if(fileSubmitStatus!=="SUCCESS")
              setAlertMessage("Error submitting form-data")
            else
              window.location.reload()
          }
          else
            window.location.reload()
        }
      }
    }
    //To update an already created meeting
    else if(submitType==="Update")
    {
      //data validation
      if(title.trim()==='' || selectdPartcipants.length<2 || availableTimeSlots.length===0 || startTime<minTime 
        || endTime>maxTime || startTime>endTime || startTime==='' || endTime==='') {
          if(selectdPartcipants.length<2)
            setAlertMessage("Select atleast two participants")
          else
            setAlertMessage("Please fill in all the details correctly")
      }
      else {
          setAlertMessage(' ')
          console.log('Updating...')
          let requestBody = {
            meetingId : interviewDetails._id,
            title : title,
            date : `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`,
            start_time : startTime,
            end_time : endTime,
            participants : selectdPartcipants
          }
    
          var response = await API.post(constants.EDIT_MEETING_URL, requestBody)

          if(response.status === "SUCCESS")
          {

            // submit uploaded file
            if(uploadedFile!==null)
            {
              var fileSubmitStatus = await handleFileSubmit(interviewDetails._id)
              if(fileSubmitStatus!=="SUCCESS")
                setAlertMessage("Error submitting form-data")
              else
                window.location.reload()
            }
            else
              window.location.reload()
          }
      }
      
    }
    console.log(response)
    //clear the form after submission
    handleClose();
  }

  const updateParticipantsList = (selectedList, selectedItem) => {
      setSelectdParticipants(selectedList);
  }


  // function to populate the available time slot drop down list
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
                options={participantEmailList}
                showCheckbox
                className='select-participants-list'
            />
            <div className='interview-date'>
                <label className='interview-date-label'>Date:</label>
                <DatePicker onChange={setDate} value={date} format="dd/MM/yyyy" minDate={new Date()}/>
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
                      minTime={availableTimeSlots ? minTime : new Date().getTime} maxTime={maxTime}
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
                      minTime={startTime} maxTime={maxTime}
                  />
              </div>
            </div>
            <div className='submitfile'>
              <p>Upload Files such as Transcript, Resume, Cover letter (accepted file format is .ZIP) </p>
              <input type="file" onChange = {handleFileUpload} className='upload-resume' />
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