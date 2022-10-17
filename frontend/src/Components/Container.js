import React, {useEffect, useState} from 'react'
import '../css/Container.css'
import Interviews from './Interviews'
import Searchbar from './Searchbar'
import API from '../api/api'
import { constants } from '../constants/constants'
import { trackPromise } from 'react-promise-tracker';
import DatePicker from 'react-date-picker';

function Container() {

  const [scheduledInterviews, setScheduledInterviews] = useState([])
  const [interviewsToDisplay, setInterviewsToDisplay] = useState(scheduledInterviews);
  const [date, setDate] = useState('');


  // searching interview details based on the search query 
  const handleSearch = (newSearchQuery) => {
    var interviewDetails = []
    scheduledInterviews.map((interview) => {
      if(interview.title.toLowerCase().includes(newSearchQuery)){
        interviewDetails.push(interview)
      }
    })
    setInterviewsToDisplay(interviewDetails)
  }

  // Handling search interviews by date 
  useEffect(()=> {
    console.log(date)
    if(date === null || date ===  '' || date === undefined) {
      setInterviewsToDisplay(scheduledInterviews)
      return;
    }
    const dateFilter = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    var interviewDetails = []
    scheduledInterviews.map((interview) => {
      if(interview.date === dateFilter){
        interviewDetails.push(interview)
      }
    })
    setInterviewsToDisplay(interviewDetails)
  }, [date])

 //Fetching all scheduled interviews data from the database
  useEffect(()=>{
    async function fetchData() {
      var interviewData = await API.get(constants.MEETING_DETAILS_URL)
      console.log(interviewData.all_meeting_details)
      setScheduledInterviews(interviewData.all_meeting_details)
      setInterviewsToDisplay(interviewData.all_meeting_details)
    }
    trackPromise(fetchData());

  }, [])

  return (
    <div className='container'>
        <div className='content'>
            <Searchbar handleSearch={handleSearch}/>
            <div className='head-n-date'>
                <h4>Scheduled Interviews</h4>
                <DatePicker onChange={setDate} format="dd/MM/yyyy" value={date} />
            </div>
            <Interviews interviewsToDisplay={interviewsToDisplay} rowsPerPage={5}/>
            
        </div>
    </div>
  )
}

export default Container