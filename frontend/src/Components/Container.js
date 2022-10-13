import React, {useEffect, useState} from 'react'
import '../css/Container.css'
import Interviews from './Interviews'
import Searchbar from './Searchbar'
import API from '../api/api'
import { constants } from '../constants/constants'

function Container() {

  const [scheduledInterviews, setScheduledInterviews] = useState([])
  const [interviewsToDisplay, setInterviewsToDisplay] = useState(scheduledInterviews);

  const handleSearch = (newSearchQuery) => {
    if(newSearchQuery === '') {
      setInterviewsToDisplay(scheduledInterviews)
      return;
    }
  
    var interviewDetails = []
    scheduledInterviews.map((interview) => {
      if(interview.title.toLowerCase().includes(newSearchQuery)){
        interviewDetails.push(interview)
      }
    })
    setInterviewsToDisplay(interviewDetails)
  }

  useEffect(()=>{
    async function fetchData() {
      var interviewData = await API.get(constants.MEETING_DETAILS_URL)
      //console.log(interviewData.all_meeting_details)
      console.log(interviewData.all_meeting_details)
      setScheduledInterviews(interviewData.all_meeting_details)
      setInterviewsToDisplay(interviewData.all_meeting_details)
    }
    fetchData();

  }, [])

  return (
    <div className='container'>
        <div className='content'>
            <Searchbar handleSearch={handleSearch}/>
            <h4>Scheduled Interviews</h4>
            <Interviews interviewsToDisplay={interviewsToDisplay}/>
        </div>
    </div>
  )
}

export default Container